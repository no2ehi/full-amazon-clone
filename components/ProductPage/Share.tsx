import {
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

const Share = () => {
    return (
        <div className="flex space-x-2">
            <FacebookShareButton url={window?.location.href}>
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={window?.location.href}>
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <LinkedinShareButton url={window?.location.href}>
                <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <PinterestShareButton url={window?.location.href}>
                <PinterestIcon size={32} round={true} />
            </PinterestShareButton>
            <TelegramShareButton url={window?.location.href}>
                <TelegramIcon size={32} round={true} />
            </TelegramShareButton>
            <TwitterShareButton url={window?.location.href}>
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <RedditShareButton url={window?.location.href}>
                <RedditIcon size={32} round={true} />
            </RedditShareButton>
        </div>
    );
};

export default Share;
