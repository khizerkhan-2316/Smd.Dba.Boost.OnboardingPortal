import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';
import { sendResetPasswordEmail } from '../../../services/emailService';

import BaseContainer from '../../common/BaseContainer';
import BaseCard from '../../common/BaseCard';
import ResetPasswordMailForm from '../../forms/ResetPasswordMailForm';

function ResetPage() {
  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  async function resetPasswordHandler(email: string) {
    setLoading(true);

    try {
      await sendResetPasswordEmail(email);
      showModal({
        showCancelButton: false,
        title: 'Email Sent',
        message: 'Please check your email to reset your password',
        onConfirm: () => {
          hideModal();
        },
        open: true,
      });
    } catch (error: any) {
      showModal({
        showCancelButton: false,
        title: 'Error',
        message: error.message,
        onConfirm: () => {
          hideModal();
        },
        open: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseContainer>
      <BaseCard
        title="Få tilsendt en nulstillingsmail"
        linkTitle="Tilbage til login"
        path="/login"
      >
        <ResetPasswordMailForm onSubmit={resetPasswordHandler} />
      </BaseCard>
    </BaseContainer>
  );
}

export default ResetPage;
