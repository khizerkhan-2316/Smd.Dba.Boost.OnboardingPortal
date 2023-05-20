import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import BaseTable from '../../common/BaseTable';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import { Company } from '../../../types/company';
import { getCompanies, deleteCompany } from '../../../services/companyService';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';
import SearchBar from '../../common/SearchBar';

const AdminCompaniesPage = () => {
  const { setLoading } = useLoading();
  const { showModal, hideModal } = useModal();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  const handleCreateCompany = () => {
    navigate(RoutesPath.ADMIN_CREATE_COMPANY_PAGE);
  };

  const handleUpdateCompany = (id: string) => {
    navigate(RoutesPath.ADMIN_UPDATE_COMPANY_PAGE.replace(':id', id));
  };

  const handleDetailsCompany = (id: string) => {
    navigate(RoutesPath.ADMIN_COMPANY_DETAILS_PAGE.replace(':id', id));
  };

  const navigateToOnboardingPage = (id: string) => {
    navigate(RoutesPath.ADMIN_ONBOARDING_PAGE.replace(':companyId', id));
  };

  const handleDeleteCompany = (id: string) => {
    showModal({
      title: 'Er du sikker?',
      message:
        'Er du sikker på at du vil slette denne virksomhed? Alt tilknyttet data vil blive slettet.',
      showCancelButton: true,
      open: true,
      onConfirm: async () => {
        try {
          setLoading(true);
          const response = await deleteCompany(id);
          if (response.status === 200) {
            const updatedCompanies = companies.filter(
              (company) => company.id !== id
            );
            setCompanies(updatedCompanies);
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
        } finally {
          setLoading(false);
        }
      },

      onCancel: () => {
        hideModal();
      },
    });
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = companies.filter((company) =>
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const companiesData = await getCompanies(); // Make the API call to fetch companies
        setCompanies(companiesData); // Update the `companies` state variable with the received data
        setFilteredCompanies(companiesData); // Set the initial filtered companies to all the companies
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);
  return (
    <div style={{ width: '95%' }}>
      <Typography
        variant="h6"
        sx={{ margin: '10px 0px 10px 0px' }}
        fontFamily="sans-serif"
      >
        Virksomheder
      </Typography>

      <SearchBar
        onSearch={handleSearch}
        options={companies.map((company) => company.companyName)}
      />

      <IconButton
        sx={{
          margin: '10px 0px 10px 0px',
        }}
        onClick={handleCreateCompany}
        color="primary"
      >
        <AddBusinessIcon
          sx={{
            width: '30px',
            height: '30px',
          }}
        />
      </IconButton>

      <BaseTable
        columns={[
          { id: 'companyName', label: 'Virksomhedsnavn' },
          { id: 'cvr', label: 'CVR' },
          { id: 'telephone', label: 'Telefon' },
          { id: 'opdatere', label: 'Opdatere' },
          { id: 'delete', label: 'Slet' },
          { id: 'details', label: 'Se virksomhed' },
          { id: 'onboarding', label: 'Se onboarding' },
        ]}
        data={filteredCompanies}
        editHandler={handleUpdateCompany}
        deleteHandler={handleDeleteCompany}
        detailsHandler={handleDetailsCompany}
        onboardingHandler={navigateToOnboardingPage}
      />

      {filteredCompanies.length === 0 && (
        <Typography
          variant="h6"
          sx={{ margin: '10px 0px 10px 0px' }}
          fontFamily="sans-serif"
        >
          Ingen virksomheder fundet
        </Typography>
      )}
    </div>
  );
};

export default AdminCompaniesPage;
