export const profileSidebar =[
    {
        haeding: "My Account",
        links: [
            {
                name: "My Profile",
                link: "/profile",
            },
            {
                name: "Addresses",
                link: "/profile/address",
            },
            {
                name: "My Payment Options",
                link: "/profile/payment",
            },
            {
                name: "Account Security",
                link: "",
            },
        ],
    },
    {
        haeding: "My Orders",
        links: [
            {
                name: "All Orders",
                link: "/profile/orders?tab=2",
            },
            {
                name: "Paid Orders",
                link: "/profile/orders?filter=paid&tab=2",
            },
            {
                name: "Unpaid Orders",
                link: "/profile/orders?filter=unpaid&tab=2",
            },
            {
                name: "Processing Orders",
                link: "/profile/orders?filter=processing&tab=2",
            },
            {
                name: "Unprocessed Orders",
                link: "/profile/orders?filter=unprocessed&tab=2",
            },
            {
                name: "Dispatched Orders",
                link: "/profile/orders?filter=dispatched&tab=2",
            },
            {
                name: "Delivered Orders",
                link: "/profile/orders?filter=delivered&tab=2",
            },
            {
                name: "Cancelled Orders",
                link: "/profile/orders?filter=cancelled&tab=2",
            },
        ],
    },
    {
        haeding: "My Lists",
        links: [
            {
                name: "Whishlist",
                link: "/profile/whishlist",
            },
            {
                name: "Recently Viewed",
                link: "/profile/recent",
            },
        ],
    },
    {
        haeding: "Customer Service",
        links: [
            {
                name: "My Message",
                link: "/profile/messages",
            },
            {
                name: "Service Records",
                link: "/profile/services",
            },
        ],
    },
    {
        haeding: "Policy",
        links: [
            {
                name: "My Message",
                link: "/profile/messages",
            },
            {
                name: "Service Records",
                link: "/profile/services",
            },
        ],
    },
    {
        haeding: "Sign Out",
    },
]