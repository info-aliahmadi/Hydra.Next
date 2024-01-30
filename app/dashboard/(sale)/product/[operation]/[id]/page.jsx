'use client';
import { useEffect, useState } from 'react';

// material-ui
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormHelperText,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { ArrowBack, Save, Send } from '@mui/icons-material';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from '@dashboard/_components/@extended/AnimateButton';

// assets
import { useTranslation } from 'react-i18next';
import Notify from '@dashboard/_components/@extended/Notify';
import MainCard from '@dashboard/_components/MainCard';
import setServerErrors from '/utils/setServerErrors';

import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import ProductsService from '@dashboard/(sale)/_service/ProductService';
import StoreIcon from '@mui/icons-material/Store';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductBaseInfo from '@dashboard/(sale)/_components/Product/ProductBaseInfo';
import ProductSettings from '@dashboard/(sale)/_components/Product/ProductSettings';
import ProductInventory from '@dashboard/(sale)/_components/Product/ProductInventory';
import ProductSEO from '@dashboard/(sale)/_components/Product/ProductSEO';
import { useSession } from 'next-auth/react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 4, pb: 4 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

export default function AddOrEditProduct({ params }) {
  const [t, i18n] = useTranslation();
  const [tab, setTab] = useState(0);
  const operation = params.operation;
  const id = params.id;

  const { data: session } = useSession();

  const jwt = session?.user?.accessToken;
  let productService = new ProductsService(jwt);

  const [fieldsName, validation, buttonName] = ['fields.product.', 'validation.product.', 'buttons.product.'];
  const [product, setProduct] = useState();
  const [notify, setNotify] = useState({ open: false });
  const router = useRouter();

  const loadProduct = () => {
    productService.getProductById(id).then((result) => {
      setProduct(result.data);
    });
  };
  useEffect(() => {
    if (operation == 'edit' && id > 0) loadProduct();
  }, [operation, id]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleSubmit = async (product, resetForm, setErrors, setSubmitting) => {
    if (operation == 'add') {
      productService
        .addProduct(product)
        .then(() => {
          resetForm({});
          setProduct({});
          setNotify({ open: true });
        })
        .catch((error) => {
          setServerErrors(error, setErrors);
          setNotify({ open: true, type: 'error', description: error });
        });
    } else {
      productService
        .updateProduct(product)
        .then((result) => {
          setProduct(result.data);
          setNotify({ open: true });
        })
        .catch((error) => {
          setServerErrors(error, setErrors);
          setNotify({ open: true, type: 'error', description: error });
        });
    }
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>

      <Grid container justifyContent="center" direction="row" alignItems="flex-start">
        <Grid container item spacing={3} xs={12} sm={12} md={12} lg={12} xl={12} direction="column">
          <Grid item>
            <Typography variant="h5">{t('pages.cards.product-' + operation)}</Typography>
          </Grid>
          <Grid item key={product}>
            <MainCard>
              <Formik
                initialValues={{
                  id: product?.id,
                  name: product?.name,
                  metaTitle: product?.metaTitle,
                  metaKeywords: product?.metaKeywords,
                  metaDescription: product?.metaDescription,
                  shortDescription: product?.shortDescription,
                  fullDescription: product?.fullDescription,
                  adminComment: product?.adminComment,
                  deliveryDateId: product?.deliveryDateId,
                  taxCategoryId: product?.taxCategoryId,
                  stockQuantity: product?.stockQuantity,
                  minStockQuantity: product?.minStockQuantity,
                  notifyAdminForQuantityBelow: product?.notifyAdminForQuantityBelow,
                  orderMinimumQuantity: product?.orderMinimumQuantity,
                  orderMaximumQuantity: product?.orderMaximumQuantity,
                  price: product?.price,
                  oldPrice: product?.oldPrice,
                  currencyId: product?.currencyId,
                  availableStartDateTimeUtc: product?.availableStartDateTimeUtc,
                  availableEndDateTimeUtc: product?.availableEndDateTimeUtc,
                  hasDiscountsApplied: product?.hasDiscountsApplied,
                  markAsNew: product?.markAsNew,
                  markAsNewStartDateTimeUtc: product?.markAsNewStartDateTimeUtc,
                  markAsNewEndDateTimeUtc: product?.markAsNewEndDateTimeUtc,
                  notReturnable: product?.notReturnable,
                  allowedQuantities: product?.allowedQuantities,
                  isTaxExempt: product?.isTaxExempt,
                  showOnHomepage: product?.showOnHomepage,
                  isFreeShipping: product?.isFreeShipping,
                  allowCustomerReviews: product?.allowCustomerReviews,
                  displayStockQuantity: product?.displayStockQuantity,
                  disableBuyButton: product?.disableBuyButton,
                  disableWishlistButton: product?.disableWishlistButton,
                  availableForPreOrder: product?.availableForPreOrder,
                  callForPrice: product?.callForPrice,
                  published: product?.published,
                  createdOnUtc: product?.createdOnUtc,
                  updatedOnUtc: product?.updatedOnUtc,
                  createUser: product?.createUser,
                  updateUser: product?.updateUser,
                  categoryIds: product?.categoryIds,
                  manufacturerIds: product?.manufacturerIds,
                  pictureIds: product?.pictureIds,
                  relatedProductIds: product?.relatedProductIds,
                  attributeIds: product?.attributeIds,
                  inventories: product?.inventories,
                  productTags: product?.productTags
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                  name: Yup.string()
                    .max(250)
                    .required(t(validation + 'requiredName')),
                  fullDescription: Yup.string().required(t(validation + 'requiredFullDescription')),
                  categoryIds: Yup.array()
                    .min(1, t(validation + 'requiredCategoryIds'))
                    .required(t(validation + 'requiredCategoryIds')),
                  deliveryDateId: Yup.number()
                    .required(t(validation + 'requiredDeliveryDateId')),
                  taxCategoryId: Yup.number()
                    .required(t(validation + 'requiredTaxCategoryId')),
                  stockQuantity: Yup.number()
                    .required(t(validation + 'requiredStockQuantity')),
                  minStockQuantity: Yup.number()
                    .required(t(validation + 'requiredMinStockQuantity')),
                  orderMinimumQuantity: Yup.number()
                    .required(t(validation + 'requiredOrderMinimumQuantity')),
                  orderMaximumQuantity: Yup.number()
                    .required(t(validation + 'requiredOrderMaximumQuantity')),
                  price: Yup.number()
                    .required(t(validation + 'requiredPrice')),
                  currencyId: Yup.number()
                    .required(t(validation + 'requiredCurrencyId'))
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                  try {
                    setSubmitting(true);
                    handleSubmit(values, resetForm, setErrors, setSubmitting);
                  } catch (err) {
                    console.error(err);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                  }finally{
                    setSubmitting(false);
                  }
                }}
              >
                {({ errors, touched, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, values }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <Tabs
                      value={tab}
                      onChange={handleTabChange}
                      aria-label="Vertical tabs example"
                      // sx={{ ml: '25px' }}
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab label="Base Info" icon={<StoreIcon />} iconPosition="start" {...a11yProps(0)} />
                      <Tab label="Settings" icon={<SettingsSuggestIcon />} iconPosition="start" {...a11yProps(1)} />
                      <Tab label="Inventory" icon={<InventoryIcon />} iconPosition="start" {...a11yProps(2)} />
                      <Tab label="SEO" icon={<BookmarksIcon />} iconPosition="start" {...a11yProps(3)} />
                    </Tabs>
                    <TabPanel component="div" value={tab} index={0}>
                      <ProductBaseInfo
                        operation={operation}
                        values={values}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />
                    </TabPanel>
                    <TabPanel component="div" value={tab} index={1}>
                      <ProductSettings
                        values={values}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />

                    </TabPanel>
                    <TabPanel component="div" value={tab} index={2}>
                      <ProductInventory
                        values={values}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />
                    </TabPanel>
                    <TabPanel component="div" value={tab} index={3}>
                      <ProductSEO
                        values={values}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                      />
                    </TabPanel>
                    <Grid container pt={2} pb={3}>
                      <Grid item xl={7}>
                        {(values.published || values.published == false) && Object.values(errors).length > 0 && <Alert severity="error">
                          <AlertTitle>Error</AlertTitle>
                          {Object.values(errors)?.map((error, index) =>
                            <FormHelperText key={index} error id="helper-text">
                              {error}
                            </FormHelperText>
                          )}
                        </Alert>}
                      </Grid>
                    </Grid>
                    <Grid container item spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={2}>
                          <AnimateButton>
                            <Button
                              size="large"
                              onClick={() => {
                                router.back();
                              }}
                              variant="outlined"
                              color="secondary"
                              startIcon={<ArrowBack />}
                            >
                              {t('buttons.cancel')}
                            </Button>
                          </AnimateButton>
                          <AnimateButton>
                            <Button
                              disabled={isSubmitting}
                              size="large"
                              type="submit"
                              variant="contained"
                              color="primary"
                              onClick={() => setFieldValue('published', true)}
                              startIcon={<Send />}
                            >
                              {operation == 'edit' ? t(buttonName + 'save') : t(buttonName + 'publish')}
                            </Button>
                          </AnimateButton>
                          <AnimateButton>
                            <Button
                              disabled={isSubmitting}
                              size="large"
                              type="submit"
                              variant="contained"
                              color="warning"
                              onClick={() => setFieldValue('published', false)}
                              startIcon={<Save />}
                            >
                              {t(buttonName + 'draft')}
                            </Button>
                          </AnimateButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
