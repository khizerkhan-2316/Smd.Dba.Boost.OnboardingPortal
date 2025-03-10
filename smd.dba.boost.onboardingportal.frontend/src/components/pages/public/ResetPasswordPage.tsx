import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import { validateToken } from '../../../services/authenticationService';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';
import { resetPassword } from '../../../services/authenticationService';

import BaseContainer from '../../common/BaseContainer';
import BaseCard from '../../common/BaseCard';
import ResetPasswordForm from '../../forms/ResetPasswordForm';

function ResetPasswordPage() {
  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  async function resetPasswordHandler(password: string): Promise<void> {
    try {
      setLoading(true);
      const response = await resetPassword(token!, password);

      if (response.status === 200) {
        showModal({
          title: 'Success!',
          message: 'Din adgangskode er blevet nulstillet.',
          showCancelButton: false,
          open: true,
          onConfirm: () => {
            hideModal();
          },
        });
      } else {
        showModal({
          title: 'Fejl!',
          message: `Der skete en fejl med at nulstille din adgangskode: ${response.statusText}`,
          showCancelButton: false,
          open: true,
          onConfirm: () => {
            hideModal();
          },
        });
      }
    } catch (error: any) {
      showModal({
        title: 'Fejl!',
        message: error.message,
        onConfirm: () => {
          hideModal();
        },
        showCancelButton: false,
        open: true,
      });
    } finally {
      setLoading(false);
    }
  }

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      if (token !== null) {
        try {
          const tokenValidationResult = await validateToken(token!);

          if (!tokenValidationResult.isValid) {
            navigate(RoutesPath.NOT_FOUND_PAGE);
          }
        } catch (error) {
          navigate(RoutesPath.NOT_FOUND_PAGE);
        }
      }
    };

    authenticate();
  }, [navigate, token]);
  return (
    <BaseContainer>
      <BaseCard
        title="Nulstil din adgangskode"
        linkTitle="Tilbage til login"
        path="/login"
        showLogo={true}
        showSideCard={true}
      >
        <ResetPasswordForm onSubmit={resetPasswordHandler} />
      </BaseCard>
    </BaseContainer>
  );
}

export default ResetPasswordPage;
