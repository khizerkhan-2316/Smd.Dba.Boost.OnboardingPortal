import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import { getCompanyById } from '../../../services/companyService';
import {
  getContactPersonsByCompanyId,
  deleteContactPerson,
} from '../../../services/contactPersonService';
import BaseTable from '../../common/BaseTable';
import { Company } from '../../../types/company';
import { ContactPerson } from '../../../types/contactPerson';
import { IconButton } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';

import { deleteUser, getUsersByCompanyId } from '../../../services/userService';
import { User } from '../../../types/user';
import { ProductFeed } from '../../../types/productfeed';
import {
  getProductFeedsByCompanyId,
  deleteProductFeed,
} from '../../../services/productFeedService';

const CompanyDetailsPage = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [productFeeds, setProductFeeds] = useState<ProductFeed[]>([]);

  const navigate = useNavigate();

  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  const { id } = useParams();

  const handleBack = () => {
    navigate(RoutesPath.ADMIN_HOME_PAGE);
  };

  const handleCreateContactPerson = () => {
    if (id) {
      navigate(RoutesPath.ADMIN_CREATE_CONTACT_PERSON_PAGE.replace(':id', id));
    }
  };

  const handleUpdateContactPerson = (contactPersonId: string) => {
    navigate(
      RoutesPath.ADMIN_UPDATE_CONTACT_PERSON_PAGE.replace(
        ':id',
        contactPersonId
      ).replace(':companyId', id!)
    );
  };

  const handleDeleteContactPerson = (contactPersonId: string) => {
    showModal({
      title: 'Er du sikker?',
      message:
        'Er du sikker på at du vil slette denne kontaktperson? Alt tilknyttet data vil blive slettet.',
      showCancelButton: true,
      open: true,
      onConfirm: async () => {
        try {
          const response = await deleteContactPerson(contactPersonId);
          if (response.status === 200) {
            const updatedContactPersons = contactPersons.filter(
              (contactPerson) => contactPerson.id !== contactPersonId
            );
            setContactPersons(updatedContactPersons);
            hideModal();
          }
        } catch (e: any) {
          showModal({
            title: 'Fejl!',
            message: e.message,
            showCancelButton: false,
            open: true,
            onConfirm: () => {
              hideModal();
            },
          });
        }
      },

      onCancel: () => {
        hideModal();
      },
    });
  };

  const handleCreateUser = () => {
    if (id) {
      navigate(RoutesPath.ADMIN_CREATE_USER_PAGE.replace(':companyId', id));
    }
  };

  const handleUpdateUser = (userId: string) => {
    navigate(
      RoutesPath.ADMIN_UPDATE_USER_PAGE.replace(':id', userId).replace(
        ':companyId',
        id!
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    showModal({
      title: 'Er du sikker?',
      message:
        'Er du sikker på at du vil slette denne bruger? Alt tilknyttet data vil blive slettet.',
      showCancelButton: true,
      open: true,
      onConfirm: async () => {
        try {
          const response = await deleteUser(userId);
          if (response.status === 200) {
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
            hideModal();
          }
        } catch (e: any) {
          showModal({
            title: 'Fejl!',
            message: e.message,
            showCancelButton: false,
            open: true,
            onConfirm: () => {
              hideModal();
            },
          });
        }
      },

      onCancel: () => {
        hideModal();
      },
    });
  };

  const handleCreateProductFeed = () => {
    if (id) {
      navigate(
        RoutesPath.ADMIN_CREATE_PRODUCTFEED_PAGE.replace(':companyId', id)
      );
    }
  };

  const handleUpdateProductFeed = (productFeedId: string) => {
    if (id) {
      navigate(
        RoutesPath.ADMIN_UPDATE_PRODUCTFEED_PAGE.replace(
          ':companyId',
          id!
        ).replace(':id', productFeedId)
      );
    }
  };

  const handleDeleteProductFeed = (productFeedId: string) => {
    showModal({
      title: 'Er du sikker?',
      message:
        'Er du sikker på at du vil slette dette produktfeed? Alt tilknyttet data vil blive slettet.',
      showCancelButton: true,
      open: true,
      onConfirm: async () => {
        try {
          const response = await deleteProductFeed(productFeedId);
          if (response.status === 200) {
            const updatedProductFeeds = productFeeds.filter(
              (productFeed) => productFeed.id !== productFeedId
            );
            setProductFeeds(updatedProductFeeds);
            hideModal();
          }
        } catch (e: any) {
          showModal({
            title: 'Fejl!',
            message: e.message,
            showCancelButton: false,
            open: true,
            onConfirm: () => {
              hideModal();
            },
          });
        }
      },

      onCancel: () => {
        hideModal();
      },
    });
  };

  useEffect(() => {
    const getCompany = async () => {
      if (!id) return;
      const company = await getCompanyById(id);

      setCompany(company);
    };

    const getContactPersons = async () => {
      if (!id) return;
      const contactPersons = await getContactPersonsByCompanyId(id);
      setContactPersons(contactPersons);
    };

    const getUsers = async () => {
      if (!id) return;
      const users = await getUsersByCompanyId(id);

      setUsers(users);
    };

    const getProductFeeds = async () => {
      if (!id) return;
      const productFeeds = await getProductFeedsByCompanyId(id);

      setProductFeeds(productFeeds);
    };

    getCompany();
    getContactPersons();
    getUsers();
    getProductFeeds();
  }, []);

  return (
    <div style={{ width: '95%' }}>
      <Button
        sx={{ margin: '10px 0px 10px 0px' }}
        variant="contained"
        color="primary"
        onClick={handleBack}
      >
        Tilbage
      </Button>

      <Typography
        variant="h6"
        sx={{ margin: '10px 0px 10px 0px' }}
        fontFamily="sans-serif"
      >
        Virksomhedsdetaljer
      </Typography>

      {company && (
        <BaseTable
          columns={[
            {
              id: 'companyName',
              label: 'Virksomhedsnavn',
            },
            { id: 'streetName', label: 'Vejnavn' },
            { id: 'postalCode', label: 'Postnummer' },
            { id: 'city', label: 'By' },
            { id: 'telephone', label: 'Telefon' },
            { id: 'cvr', label: 'CVR' },
            { id: 'loginEmail', label: 'Email til login' },
            { id: 'invoiceEmail', label: 'Email til faktura' },
          ]}
          data={[company]}
        />
      )}

      <Typography
        variant="h6"
        sx={{ margin: '20px 0px 10px 0px' }}
        fontFamily="sans-serif"
      >
        Virksomhedens kontaktperson(er)
      </Typography>

      <IconButton
        onClick={handleCreateContactPerson}
        sx={{ margin: '10px 0px 10px 0px' }}
        color="primary"
      >
        <PersonAddIcon
          sx={{
            width: '30px',
            height: '30px',
          }}
        />
      </IconButton>

      <BaseTable
        columns={[
          {
            id: 'name',
            label: 'Navn',
          },
          { id: 'email', label: 'Email' },
          { id: 'telephone', label: 'Telefonnummer' },
          { id: 'opdatere', label: 'Opdatere' },
          { id: 'delete', label: 'Slet' },
        ]}
        data={contactPersons}
        editHandler={handleUpdateContactPerson}
        deleteHandler={handleDeleteContactPerson}
      />

      <Typography
        variant="h6"
        sx={{ margin: '20px 0px 10px 0px' }}
        fontFamily="sans-serif"
      >
        Bruger(e) registeret til virksomheden
      </Typography>

      <IconButton
        onClick={handleCreateUser}
        sx={{ margin: '10px 0px 10px 0px' }}
        color="primary"
      >
        <PersonAddIcon
          sx={{
            width: '30px',
            height: '30px',
          }}
        />
      </IconButton>

      <BaseTable
        columns={[
          {
            id: 'username',
            label: 'Brugernavn',
          },
          { id: 'email', label: 'Email' },
          { id: 'opdatere', label: 'Opdatere' },
          { id: 'delete', label: 'Slet' },
        ]}
        data={users}
        editHandler={handleUpdateUser}
        deleteHandler={handleDeleteUser}
      />

      <Typography
        variant="h6"
        sx={{ margin: '20px 0px 10px 0px' }}
        fontFamily="sans-serif"
      >
        Produktfeed(s) tilknyttet virksomheden
      </Typography>

      <IconButton
        onClick={handleCreateProductFeed}
        sx={{ margin: '10px 0px 10px 0px' }}
        color="primary"
      >
        <FeedIcon
          sx={{
            width: '30px',
            height: '30px',
          }}
        />
      </IconButton>

      <BaseTable
        columns={[
          {
            id: 'title',
            label: 'Titel',
          },
          { id: 'description', label: 'Beskrivelse' },
          { id: 'productFeedType', label: 'Feed type' },
          { id: 'url', label: 'URL' },
          { id: 'opdatere', label: 'Opdatere' },
          { id: 'delete', label: 'Slet' },
        ]}
        data={productFeeds}
        deleteHandler={handleDeleteProductFeed}
        editHandler={handleUpdateProductFeed}
      />

      <Typography
        variant="h6"
        sx={{ margin: '20px 0px 10px 0px' }}
        fontFamily="sans-serif"
      >
        Robot(ter) tilknyttet virksomheden
      </Typography>
    </div>
  );
};

export default CompanyDetailsPage;
