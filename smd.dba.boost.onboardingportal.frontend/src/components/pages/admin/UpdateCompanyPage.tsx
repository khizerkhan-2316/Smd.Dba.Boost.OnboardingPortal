import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import CompanyForm from '../../forms/CompanyForm';
import BaseCard from '../../common/BaseCard';
import Box from '@mui/material/Box';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';
import { Company } from '../../../types/company';
import {
  getCompanyById,
  updateCompany,
} from '../../../services/companyService';
import { AxiosResponse } from 'axios';

const UpdateCompanyPage = () => {
  const [company, setCompany] = useState<Company | null>(null); // Add the `company` state variable
  const navigate = useNavigate();
  const { id } = useParams();

  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  const handleGoBack = () => {
    navigate(RoutesPath.ADMIN_HOME_PAGE);
  };

  async function updateCompanyHandler(company: Company): Promise<void> {
    if (!id) return;

    try {
      setLoading(true);
      const response: AxiosResponse = await updateCompany(id, company);

      console.log(response);
      if (response.status === 200) {
        showModal({
          title: 'Success!',
          message: 'Virksomheden er blevet opdateret.',
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
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const companyData = await getCompanyById(id!);
        setCompany({ ...companyData });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
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
        {company && (
          <BaseCard title={`Opdatere virksomhed: ${company.companyName}`}>
            <CompanyForm
              onSubmit={updateCompanyHandler}
              company={company}
              buttonTitle="Opdatere virksomhed"
            />
          </BaseCard>
        )}
      </Box>
    </Box>
  );
};

export default UpdateCompanyPage;
