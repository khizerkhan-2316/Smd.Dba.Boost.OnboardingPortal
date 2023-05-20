import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import ContactPersonForm from '../../forms/ContactPersonForm';
import BaseCard from '../../common/BaseCard';
import Box from '@mui/material/Box';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';
import { ContactPerson } from '../../../types/contactPerson';
import {
  getContactPersonById,
  updateContactPerson,
} from '../../../services/contactPersonService';
import { AxiosResponse } from 'axios';

const UpdateContactPersonPage = () => {
  const [contactPerson, setContactPerson] = useState<ContactPerson | null>(
    null
  );

  const navigate = useNavigate();

  const { id, companyId } = useParams();

  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  const handleGoBack = () => {
    navigate(RoutesPath.ADMIN_COMPANY_DETAILS_PAGE.replace(':id', companyId!));
  };

  async function updateContactPersonHandler(
    contactPerson: ContactPerson
  ): Promise<void> {
    if (!id) return;

    try {
      setLoading(true);
      const response: AxiosResponse = await updateContactPerson(
        id,
        contactPerson
      );

      console.log(response);
      if (response.status === 200) {
        showModal({
          title: 'Success!',
          message: 'Kontaktpersonen er blevet opdateret.',
          showCancelButton: false,
          open: true,
          onConfirm: () => {
            hideModal();
          },
        });
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getContactPerson() {
      if (!id) return;

      try {
        setLoading(true);
        const response = await getContactPersonById(id);
        setContactPerson({ ...response });
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
      } finally {
        setLoading(false);
      }
    }

    getContactPerson();
  }, []);

  return (
    <Box width="95%">
      <Button
        sx={{ mt: 1, mb: 1, p: 1 }}
        variant="contained"
        color="primary"
        onClick={handleGoBack}
      >
        Tilbage
      </Button>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2} // Add appropriate padding
      >
        {contactPerson && (
          <BaseCard title={`Opdatere kontaktperson: ${contactPerson.name}`}>
            <ContactPersonForm
              contactPerson={contactPerson}
              onSubmit={updateContactPersonHandler}
              buttonTitle="Opdatere kontaktperson"
              companyId={companyId!}
            />
          </BaseCard>
        )}
      </Box>
    </Box>
  );
};

export default UpdateContactPersonPage;
