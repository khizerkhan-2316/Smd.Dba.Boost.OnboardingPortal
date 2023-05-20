import ContactPersonForm from '../../forms/ContactPersonForm';
import Box from '@mui/material/Box';
import BaseCard from '../../common/BaseCard';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import { Button } from '@mui/material';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';

import { ContactPerson } from '../../../types/contactPerson';
import { createContactPerson } from '../../../services/contactPersonService';
import { AxiosResponse } from 'axios';

const CreateContactPersonPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  const handleGoBack = () => {
    navigate(RoutesPath.ADMIN_COMPANY_DETAILS_PAGE.replace(':id', id!));
  };

  async function createContactPersonHandler(contactPerson: ContactPerson) {
    try {
      setLoading(true);
      const response: AxiosResponse = await createContactPerson(contactPerson);

      if (response.status === 200) {
        showModal({
          title: 'Success!',
          message: 'Kontaktpersonen er blevet oprettet.',
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
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <BaseCard title="Opret kontakt person">
          <ContactPersonForm
            onSubmit={createContactPersonHandler}
            buttonTitle="Opret kontakt person"
            companyId={id!}
          />
        </BaseCard>
      </Box>
    </Box>
  );
};

export default CreateContactPersonPage;
