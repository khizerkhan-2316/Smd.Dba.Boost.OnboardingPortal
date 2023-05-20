import { ProductFeedFormProps } from '../../types/props';
import BaseTextField from '../common/BaseTextField';
import BaseButton from '../common/BaseButton';
import { handleSubmit } from '../../utils/formUtils';
import { handleInputFieldChange } from '../../utils/formUtils';
import { useState, useEffect } from 'react';
import { CardActions } from '@mui/material';
import { MenuItem, Select } from '@mui/material';
import { isValidUrl } from '../../utils/formUtils';

const ProductFeedForm = ({
  onSubmit,
  buttonTitle,
  companyId,
  productFeed,
}: ProductFeedFormProps) => {
  const feedTypes = [
    { value: 0, label: 'XML' },
    { value: 1, label: 'JSON' },
    { value: 2, label: 'CSV' },
  ];

  const [title, setTitle] = useState(productFeed?.title || '');
  const [description, setDescription] = useState(
    productFeed?.description || ''
  );
  const [selectedFeedType, setSelectedFeedType] = useState<number | null>(
    productFeed?.productFeedType || null
  );

  const [url, setUrl] = useState(productFeed?.url || '');

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(false);

  const [isTitleInputTouched, setIsTitleInputTouched] = useState(false);
  const [isDescriptionInputTouched, setIsDescriptionInputTouched] =
    useState(false);
  const [isUrlInputTouched, setIsUrlInputTouched] = useState(false);

  useEffect(() => {
    if (productFeed) {
      setIsTitleValid(productFeed.title.length > 0);
      setIsDescriptionValid(true);
      setIsUrlValid(productFeed.url.length > 0);
    }
  }, [productFeed]);

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, isTitleValid && isDescriptionValid && isUrlValid, () =>
          onSubmit({
            title,
            description,
            productFeedType: Number(selectedFeedType),
            url,
            companyId,
          })
        )
      }
    >
      <BaseTextField
        label="Titel"
        type="text"
        value={title}
        onChange={(e) =>
          handleInputFieldChange(
            e,
            setTitle,
            setIsTitleValid,
            setIsTitleInputTouched,
            (value) => value.length > 0
          )
        }
        error={!isTitleValid && isTitleInputTouched}
        required
        fullWidth
        margin="normal"
        onFocus={() => setIsTitleInputTouched(true)}
      />
      <BaseTextField
        label="Beskrivelse"
        type="text"
        value={description}
        onChange={(e) =>
          handleInputFieldChange(
            e,
            setDescription,
            setIsDescriptionValid,
            setIsDescriptionInputTouched,
            (value) => value.length > 0 || value === ''
          )
        }
        error={
          isDescriptionInputTouched &&
          !isDescriptionValid &&
          description.length > 0
        }
        fullWidth
        margin="normal"
        onFocus={() => setIsDescriptionInputTouched(true)}
      />
      <Select
        label={selectedFeedType === null ? 'Vælg produktfeed type' : ''}
        value={selectedFeedType}
        onChange={(e) => setSelectedFeedType(Number(e.target.value))}
        fullWidth
        margin="dense"
        required
        displayEmpty
      >
        {selectedFeedType !== null && (
          <MenuItem value={selectedFeedType}>
            {feedTypes.find((type) => type.value === selectedFeedType)?.label}
          </MenuItem>
        )}
        {selectedFeedType === null && (
          <MenuItem disabled value="">
            Vælg produktfeed type
          </MenuItem>
        )}
        {feedTypes.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </Select>

      <BaseTextField
        label="URL"
        type="text"
        value={url}
        onChange={(e) =>
          handleInputFieldChange(
            e,
            setUrl,
            setIsUrlValid,
            setIsUrlInputTouched,
            (value) => isValidUrl(value)
          )
        }
        error={!isUrlValid && isUrlInputTouched}
        required
        fullWidth
        margin="normal"
        onFocus={() => setIsUrlInputTouched(true)}
      />
      <CardActions>
        <BaseButton
          disabled={!(isTitleValid && isDescriptionValid && isUrlValid)}
        >
          {buttonTitle}
        </BaseButton>
      </CardActions>
    </form>
  );
};

export default ProductFeedForm;
