import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppSelector } from "@/redux/hooks";
import {
    hideDialog,
    selectDialog,
    showDialog,
} from "@/redux/slices/DialogSlice";
import { useDispatch } from "react-redux";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";


export default function DialogModal() {
    const dialog = useAppSelector(selectDialog);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        dispatch(
            showDialog({
                header: "test dialog",
                msgs: {
                    msg: "messages test dialog",
                    type: "error",
                },
            })
        );
    };

    const handleClose = () => {
        dispatch(hideDialog());
    };

    return (
        <div>
            {/* <Button v
             */}
            <Dialog
                open={dialog.show}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    className={`${
                        dialog.msgs.type === "error"
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-slate-800"
                    }`}
                    id="alert-dialog-title"
                >
                    {dialog.header}
                </DialogTitle>
                <DialogContent className="mt-4">
                    <DialogContentText id="alert-dialog-description">
                        {dialog.msgs.length > 1 ? (
                          dialog.msgs.map((item: any) => (
                            <p className="flex items-center mb-1" key={item.msg}>
                              {item.type === "error" ? (<ExclamationTriangleIcon className="w-6 h-6 fill-red-500" />) : (<CheckCircleIcon className="w-6 h-6 fill-green-500" />)}
                              <span className="ml-1">{item.msg}</span>
                            </p>
                        ))
                        ) : (
                          <p className="flex items-center mb-1">
                              {dialog.msgs.type === "error" ? (<ExclamationTriangleIcon className="w-6 h-6 fill-red-500" />) : (<CheckCircleIcon className="w-6 h-6 fill-green-500" />)}
                              <span className="ml-1">{dialog.msgs.msg}</span>
                            </p>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
