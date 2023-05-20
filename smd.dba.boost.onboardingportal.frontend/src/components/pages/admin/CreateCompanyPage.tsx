import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import CompanyForm from '../../forms/CompanyForm';
import BaseCard from '../../common/BaseCard';
import Box from '@mui/material/Box';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';
import { Company } from '../../../types/company';
import { createCompany } from '../../../services/companyService';
import { AxiosResponse } from 'axios';

const CreateCompanyPage = () => {
  const navigate = useNavigate();

  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  const handleGoBack = () => {
    navigate(RoutesPath.ADMIN_HOME_PAGE);
  };

  async function createCompanyHandler(company: Company): Promise<void> {
    try {
      setLoading(true);
      const response: AxiosResponse = await createCompany(company);

      if (response.status === 200) {
        showModal({
          title: 'Success!',
          message: 'Virksomheden er blevet oprettet.',
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
        <BaseCard title="Opret virksomhed">
          <CompanyForm
            buttonTitle="Opret virksomhed"
            onSubmit={createCompanyHandler}
          />
        </BaseCard>
      </Box>
    </Box>
  );
};

export default CreateCompanyPage;
