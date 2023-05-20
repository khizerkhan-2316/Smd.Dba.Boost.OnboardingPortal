import UserForm from '../../forms/UserForm';
import Box from '@mui/material/Box';
import BaseCard from '../../common/BaseCard';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import { User } from '../../../types/user';
import { updateUser, getUserById } from '../../../services/userService';
import { AxiosResponse } from 'axios';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';
import { Role } from '../../../Enums/roles';
import { useState, useEffect } from 'react';

const UpdateUserPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const { companyId, id } = useParams();

  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  console.log('KOMAPNI ID: ', companyId);
  const handleGoBack = () => {
    navigate(RoutesPath.ADMIN_COMPANY_DETAILS_PAGE.replace(':id', companyId!));
  };

  async function updateUserHandler(user: User): Promise<void> {
    if (!id) return;

    try {
      setLoading(true);
      const response: AxiosResponse = await updateUser(id, user);

      console.log(response);
      if (response.status === 200) {
        showModal({
          title: 'Success!',
          message: 'Brugeren er blevet opdateret.',
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
    async function fetchUser() {
      if (!id) return;
      try {
        setLoading(true);

        const userData = await getUserById(id);
        setUser(userData);
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
    fetchUser();
  }, []);

  return (
    <Box width="95%">
      <Button
        sx={{ mt: 1, mb: 1, p: 1 }}
        variant="contained"
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
        {user && (
          <BaseCard title={`Opdatere bruger: ${user.username}`}>
            <UserForm
              user={user}
              onSubmit={updateUserHandler}
              buttonTitle="Opdater bruger"
              companyId={companyId!}
              role={Role.USER}
            />
          </BaseCard>
        )}
      </Box>
    </Box>
  );
};

export default UpdateUserPage;
