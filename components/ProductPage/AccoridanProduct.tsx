import * as React from "react";
import { styled } from "@mui/material/styles";
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
    borderRadius: 5,
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ChevronRightIcon className="w-5 h-5" />}
        {...props}
    />
))(({ theme }) => ({
    // backgroundColor:
    //     theme.palette.mode === "dark"
    //         ? "rgba(255, 255, 255, .05)"
    //         : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function AccoridanProduct({ details, questions }: any) {
    // console.log('question',questions)
    const [expanded, setExpanded] = React.useState<string | false>();

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div className="rounded">
            <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
            >
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >
                    <Typography>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {details
                        .slice(0, details.length)
                        .map((info: any, i: any) => (
                            <div className="grid grid-cols-2" key={i}>
                                <span>{info.name}</span>
                                <span>{info.value}</span>
                            </div>
                        ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
            >
                <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                >
                    <Typography>Questions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {questions
                        .slice(0, questions.length)
                        .map((info: any, i: any) => (
                            <div key={i} className="grid grid-cols-2 gap-y-3">
                                <span>{info.question}</span>
                                <span>{info.answer}</span>
                            </div>
                        ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
