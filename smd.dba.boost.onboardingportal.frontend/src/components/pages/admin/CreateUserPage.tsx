import UserForm from '../../forms/UserForm';
import Box from '@mui/material/Box';
import BaseCard from '../../common/BaseCard';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import { User } from '../../../types/user';
import { createUser } from '../../../services/userService';
import { AxiosResponse } from 'axios';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';
import { Role } from '../../../Enums/roles';

const CreateUserPage = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();

  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  const handleGoBack = () => {
    navigate(RoutesPath.ADMIN_COMPANY_DETAILS_PAGE.replace(':id', companyId!));
  };

  async function createUserHandler(user: User): Promise<void> {
    try {
      setLoading(true);
      const response: AxiosResponse = await createUser(user);

      if (response.status === 200) {
        showModal({
          title: 'Success!',
          message: 'Brugeren er blevet oprettet.',
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
        <BaseCard title="Opret bruger">
          <UserForm
            buttonTitle="Opret bruger"
            companyId={companyId!}
            onSubmit={createUserHandler}
            role={Role.USER}
          />
        </BaseCard>
      </Box>
    </Box>
  );
};

export default CreateUserPage;
