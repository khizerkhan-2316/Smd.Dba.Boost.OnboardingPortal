import ProductFeedForm from '../../forms/ProductFeedForm';
import Box from '@mui/material/Box';
import BaseCard from '../../common/BaseCard';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import { Button } from '@mui/material';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';

import { ProductFeed } from '../../../types/productfeed';
import { createProductFeed } from '../../../services/productFeedService';
import { AxiosResponse } from 'axios';

const CreateProductFeedPage = () => {
  const navigate = useNavigate();

  const { companyId } = useParams();

  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  const handleGoBack = () => {
    navigate(RoutesPath.ADMIN_COMPANY_DETAILS_PAGE.replace(':id', companyId!));
  };

  async function createProductFeedHandler(productFeed: ProductFeed) {
    try {
      setLoading(true);
      const response: AxiosResponse = await createProductFeed(productFeed);

      if (response.status === 200) {
        showModal({
          title: 'Success!',
          message: 'Produktfeedet er blevet oprettet.',
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
        <BaseCard title="Opret produktfeed">
          <ProductFeedForm
            onSubmit={createProductFeedHandler}
            buttonTitle="Opret produkt feed"
            companyId={companyId!}
          />
        </BaseCard>
      </Box>
    </Box>
  );
};

export default CreateProductFeedPage;
