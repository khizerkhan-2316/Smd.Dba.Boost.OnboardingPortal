import { LocalStorageKey } from '../../../Enums/localStorageKeys';
import { Role } from '../../../Enums/roles';
import { RoutesPath } from '../../../Enums/routePaths';
import { authenticateUser } from '../../../services/authenticationService';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';

import BaseContainer from '../../common/BaseContainer';
import BaseCard from '../../common/BaseCard';
import LoginForm from '../../forms/LoginForm';

function LoginPage() {
  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  const { SetAuthenticationState } = useAuth();

  const navigate = useNavigate();

  async function loginHandler(email: string, password: string) {
    try {
      setLoading(true);
      const response = await authenticateUser({ email, password });
      saveAuthenticationData(response);
      navigateToHomePage(response.role);
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

  function saveAuthenticationData(response: any) {
    const { token, role } = response;
    localStorage.setItem(LocalStorageKey.ROLE, role);
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, token);
    localStorage.setItem(LocalStorageKey.USERNAME, response.username);
    SetAuthenticationState();
  }

  function navigateToHomePage(role: string) {
    if (role === Role.ADMIN) {
      navigate(RoutesPath.ADMIN_HOME_PAGE);
    } else {
      navigate(RoutesPath.USER_HOME_PAGE);
    }
  }

  return (
    <BaseContainer>
      <BaseCard
        title="Login på din konto"
        linkTitle="Glemt adgangskode?"
        path="/reset"
        showLogo={true}
        showSideCard={true}
      >
        <LoginForm onSubmit={loginHandler} />
      </BaseCard>
    </BaseContainer>
  );
}

export default LoginPage;
