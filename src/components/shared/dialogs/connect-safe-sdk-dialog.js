import {Button, Dialog, DialogContent, Stack, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import React from "react";

const ConnectSafeSdkDialog = ({open, onClose, handleConnect}) => {

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: yup.object({}).shape({
            safeAddress: yup.string().required('Safe Address required')
        }),
        onSubmit: async (values, formikHelpers) => {
            handleConnect(values.safeAddress)
            formikHelpers.resetForm();
        },
        initialValues: {
            safeAddress: ''
        }
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg">
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2} direction="column">
                        <Typography variant="body2" sx={{mb: 2, color: 'text.primary'}}>
                            Enter safe address
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth={true}
                            size="small"
                            placeholder="Safe address"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            required={true}
                            label="Safe address"
                            name="safeAddress"
                            error={Boolean(formik.touched.safeAddress && formik.errors.safeAddress)}
                            helperText={formik.touched.safeAddress && formik.errors.safeAddress}
                        />
                        <Button
                            onClick={formik.handleSubmit}
                            disableElevation={true}
                            fullWidth={true}
                            type="submit"
                            color="secondary"
                            variant="contained" size="large"
                            sx={{textTransform: 'none'}}>
                            Add
                        </Button>
                    </Stack>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ConnectSafeSdkDialog;
