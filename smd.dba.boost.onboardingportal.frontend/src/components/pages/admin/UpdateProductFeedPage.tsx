import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ProductFeedForm from '../../forms/ProductFeedForm';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesPath } from '../../../Enums/routePaths';
import BaseCard from '../../common/BaseCard';
import Box from '@mui/material/Box';
import { useLoading } from '../../../hooks/useLoading';
import { useModal } from '../../../hooks/useModal';
import { ProductFeed } from '../../../types/productfeed';
import {
  getProductFeedById,
  updateProductFeed,
} from '../../../services/productFeedService';
import { AxiosResponse } from 'axios';

const UpdateProductFeedPage = () => {
  const [productFeed, setProductFeed] = useState<ProductFeed | null>(null);

  const navigate = useNavigate();

  const { companyId, id } = useParams();

  const { showModal, hideModal } = useModal();

  const { setLoading } = useLoading();

  const handleGoBack = () => {
    navigate(RoutesPath.ADMIN_COMPANY_DETAILS_PAGE.replace(':id', companyId!));
  };

  async function updateProductFeedHandler(
    productFeed: ProductFeed
  ): Promise<void> {
    if (!id) return;

    try {
      setLoading(true);
      const response: AxiosResponse = await updateProductFeed(id, productFeed);

      console.log(response);
      if (response.status === 200) {
        showModal({
          title: 'Success!',
          message: 'Produktfeedet er blevet opdateret.',
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
    async function getProductFeed() {
      if (!id) return;

      try {
        setLoading(true);
        const response = await getProductFeedById(id);
        setProductFeed({ ...response });
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

    getProductFeed();
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
        {productFeed && (
          <BaseCard title={`Opdater feed: ${productFeed.title}`}>
            <ProductFeedForm
              productFeed={productFeed}
              onSubmit={updateProductFeedHandler}
              buttonTitle="Opdater"
              companyId={companyId!}
            />
          </BaseCard>
        )}
      </Box>
    </Box>
  );
};

export default UpdateProductFeedPage;
