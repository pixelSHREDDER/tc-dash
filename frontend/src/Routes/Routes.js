import React from 'react';
//import { ListItemIcon } from '@material-ui/core';
import {
    AddEventIcon,
    //AddIcon,
    AddPostIcon,
    AddSocialMediaIcon,
    AlumniIcon,
    AnalyticsIcon,
    BoardIcon,
    BrandingColorsIcon,
    BrandingIcon,
    BrandingImagesIcon,
    BylawsIcon,
    ChangeBoardIcon,
    ChangePasswordIcon,
    DashboardIcon,
    DonationsIcon,
    //DoneIcon,
    DonorIcon,
    EditEventsIcon,
    //EditIcon,
    EditPostsIcon,
    EmailIcon,
    EventIcon,
    ExportIcon,
    //ExternalLinkIcon,
    FacebookIcon,
    ForgotPasswordIcon,
    //GetStartedIcon,
    HelpIcon,
    IveBeenHackedIcon,
    //LaunchIcon,
    MailingAddressIcon,
    MemberIcon,
    MembershipIcon,
    //MenuIcon,
    MessengerIcon,
    //NewIcon,
    OrganizationInfoIcon,
    OtherSocialMediaIcon,
    PaymentsIcon,
    PhoneNumberIcon,
    PodcastIcon,
    PostsIcon,
    SocialMediaIcon,
    StartPodcastIcon,
    SustainerIcon,
    TaglineDescriptionIcon,
    TwitterIcon,
    UpdateBylawsIcon,
    //ViewListIcon,
    WebsiteIcon
} from '../Icons';

const pageTitles = {
    "/": "Home",
    "/board/view-board": "View Board",
    "/board/edit-board": "Change Board",
    //"/branding-personalization": "Branding & Personalization",
    "/branding-personalization/change-branding-colors": "Change Branding Colors",
    "/branding-personalization/change-branding-images": "Change Branding Images",
    //"/bylaws-constitution": "Bylaws/Constitution",
    "/bylaws-constitution/update-bylaws-constitution": "Update Bylaws/Constitution",
    "/bylaws-constitution/view-bylaws-constitution": "View Bylaws/Constitution",
    "/dashboard": "Dashboard",
    //"/email": "Email",
    "/email/email-alumni": "Email Alumni",
    "/email/email-donors": "Email Donors",
    "/email/email-members": "Email Members",
    "/email/email-sustainers": "Email Sustainers",
    "/email/view-stats": "View Stats",
    //"/events": "Events",
    "/events/create-an-event": "Create an Event",
    "/events/edit-events": "Edit Events",
    "/events/view-events": "View Events",
    "/get-help": "Get Help",
    //"/get-started": "Get Started",
    "/get-started/analytics-seo": "Analytics & SEO",
    "/get-started/board-hierarchy": "Board Hierarchy",
    "/get-started/branding-personalization": "Branding & Personalization",
    "/get-started/bylaws-constitution": "Bylaws & Constitution",
    "/get-started/email": "Email",
    "/get-started/organization-info": "Organization Info",
    "/get-started/payments-finances": "Payments & Finances",
    "/get-started/podcasting": "Podcasting",
    "/get-started/social-media": "Social Media",
    "/get-started/website": "Website",
    //"/membership": "Membership",
    "/membership/export-alumni": "Export Alumni",
    "/membership/export-donors": "Export Donors",
    "/membership/export-members": "Export Members",
    "/membership/export-sustainers": "Export Sustainers",
    "/membership/view-alumni": "View Alumni",
    "/membership/view-donors": "View Donors",
    "/membership/view-members": "View Members",
    "/membership/view-sustainers": "View Sustainers",
    //"/organization-info": "Organization Info",
    "/organization-info/change-mailing-address": "Change Mailing Address",
    "/organization-info/change-phone-number": "Change Phone Number",
    "/organization-info/change-tagline-description": "Change Tagline/Description",
    //"/payments-finances": "Payments & Finances",
    "/payments-finances/export-budget": "Export Budget",
    "/payments-finances/export-donations": "Export Donations",
    "/payments-finances/view-budget": "View Budget",
    "/payments-finances/view-donations": "View Donations",
    //"/podcasting": "Podcasting",
    "/podcasting/start-a-podcast": "Start a Podcast",
    "/podcasting/view-podcast": "View Podcast",
    //"/security": "Security",
    "/security/change-a-password": "Change a Password",
    "/security/forgot-a-password": "Forgot a Password?",
    "/security/ive-been-hacked": "I've Been Hacked!",
    //"/social-media": "Social Media",
    "/social-media/add-account": "Add an Account",
    "/social-media/add-existing": "Add Existing Account",
    "/social-media/add-new": "Add New Account",
    "/social-media/post-to-facebook-page": "Post to Facebook Page",
    "/social-media/send-a-tweet": "Send a Tweet",
    "/social-media/chat-on-discord": "Chat on Discord",
    "/social-media/upload-to-flickr": "Upload to Flickr",
    "/social-media/view-github": "View Github",
    "/social-media/post-to-instagram": "Post to Instagram",
    "/social-media/post-in-linkedin-group": "Post in LinkedIn Group",
    "/social-media/post-in-meetup-group": "Post in Meetup Group",
    "/social-media/post-to-medium": "Post to Medium",
    "/social-media/chat-in-messenger-group": "Chat in Messenger Group",
    "/social-media/post-to-pinterest": "Post to Pinterest",
    "/social-media/post-on-subreddit": "Post on Subreddit",
    "/social-media/chat-on-slack": "Chat on Slack",
    "/social-media/new-snap": "New Snap",
    "/social-media/post-to-tumblr": "Post to Tumblr",
    "/social-media/upload-to-twitch": "Upload to Twitch",
    "/social-media/chat-on-whatsapp": "Chat on WhatsApp",
    "/social-media/upload-to-youtube": "Upload to YouTube",
    "/social-media/post-to-other-account": "Post to Other Account",
    //"/website": "Website",
    "/website/edit-posts": "Edit Posts",
    "/website/view-posts": "View Posts",
    "/website/view-stats": "View Stats",
    "/website/write-post": "Write a Post",
};

const routes = {
    live: [
        {
        url: 'dashboard',
        title: pageTitles['/dashboard'],
        subtitle: '',
        icon: <DashboardIcon className="smallIcon" />,
        topLevel: true,
        },
        {
        url: 'website',
        title: 'Website',
        subtitle: '',
        icon: <WebsiteIcon className="smallIcon" />,
        children: [
            {
            url: 'write-post',
            title: pageTitles['/website/write-post'],
            subtitle: '',
            icon: <AddPostIcon />
            },
            {
            url: 'view-posts',
            title: pageTitles['/website/view-posts'],
            subtitle: '',
            icon: <PostsIcon />
            },
            {
            url: 'edit-posts',
            title: pageTitles['/website/edit-posts'],
            subtitle: '',
            icon: <EditPostsIcon />
            },
            {
            url: 'view-stats',
            title: pageTitles['/website/view-stats'],
            subtitle: '',
            icon: <AnalyticsIcon />
            },
        ]
        },
        {
        url: 'board',
        title: 'Board',
        subtitle: '',
        icon: <BoardIcon className="smallIcon" />,
        children: [
            {
            url: 'view-board',
            title: pageTitles['/board/view-board'],
            subtitle: '',
            icon: <BoardIcon />
            },
            {
            url: 'edit-board',
            title: pageTitles['/board/edit-board'],
            subtitle: '',
            icon: <ChangeBoardIcon />
            },
        ]
        },
        {
        url: 'membership',
        title: 'Membership',
        subtitle: '',
        icon: <MembershipIcon className="smallIcon" />,
        children: [
            {
            url: 'view-members',
            title: pageTitles['/membership/view-members'],
            subtitle: '',
            icon: <MemberIcon />
            },
            {
            url: 'export-members',
            title: pageTitles['/membership/export-members'],
            subtitle: '',
            icon: <ExportIcon />
            },
            {
            url: 'view-alumni',
            title: pageTitles['/membership/view-alumni'],
            subtitle: '',
            icon: <AlumniIcon />
            },
            {
            url: 'export-alumni',
            title: pageTitles['/membership/export-alumni'],
            subtitle: '',
            icon: <ExportIcon />
            },
            {
            url: 'view-donors',
            title: pageTitles['/membership/view-donors'],
            subtitle: '',
            icon: <DonorIcon />
            },
            {
            url: 'export-donors',
            title: pageTitles['/membership/export-donors'],
            subtitle: '',
            icon: <ExportIcon />
            },
            {
            url: 'view-sustainers',
            title: pageTitles['/membership/view-sustainers'],
            subtitle: '',
            icon: <SustainerIcon />
            },
            {
            url: 'export-sustainers',
            title: pageTitles['/membership/export-sustainers'],
            subtitle: '',
            icon: <ExportIcon />
            },
        ]
        },
        {
        url: 'payments-finances',
        title: 'Payments & Finances',
        subtitle: '',
        icon: <PaymentsIcon className="smallIcon" />,
        children: [
            {
            url: 'view-budget',
            title: pageTitles['/payments-finances/view-budget'],
            subtitle: '',
            icon: <PaymentsIcon />
            },
            {
            url: 'export-budget',
            title: pageTitles['/payments-finances/export-budget'],
            subtitle: '',
            icon: <ExportIcon />
            },
            {
            url: 'view-donations',
            title: pageTitles['/payments-finances/view-donations'],
            subtitle: '',
            icon: <DonationsIcon />
            },
            {
            url: 'export-donations',
            title: pageTitles['/payments-finances/export-donations'],
            subtitle: '',
            icon: <ExportIcon />
            }
        ]
        },
        {
        url: 'email',
        title: 'Email',
        subtitle: '',
        icon: <EmailIcon className="smallIcon" />,
        children: [
            {
            url: 'email-members',
            title: pageTitles['/email/email-members'],
            subtitle: '',
            icon: <EmailIcon />
            },
            {
            url: 'email-alumni',
            title: pageTitles['/email/email-alumni'],
            subtitle: '',
            icon: <EmailIcon />
            },
            {
            url: 'email-donors',
            title: pageTitles['/email/email-donors'],
            subtitle: '',
            icon: <EmailIcon />
            },
            {
            url: 'email-sustainers',
            title: pageTitles['/email/email-sustainers'],
            subtitle: '',
            icon: <EmailIcon />
            },
            {
            url: 'view-stats',
            title: pageTitles['/email/view-stats'],
            subtitle: '',
            icon: <AnalyticsIcon />
            }
        ]
        },
        {
        url: 'social-media',
        title: 'Social Media',
        subtitle: '',
        icon: <SocialMediaIcon className="smallIcon" />,
        children: [
            {
            url: 'post-to-facebook-page',
            title: pageTitles['/social-media/post-to-facebook-page'],
            subtitle: '',
            icon: <FacebookIcon />
            },
            {
            url: 'send-a-tweet',
            title: pageTitles['/social-media/send-a-tweet'],
            subtitle: '',
            icon: <TwitterIcon />
            },
            {
            url: 'chat-in-messenger-group',
            title: pageTitles['/social-media/chat-in-messenger-group'],
            subtitle: '',
            icon: <MessengerIcon />
            },
            {
            url: 'post-to-other-account',
            title: pageTitles['/social-media/post-to-other-account'],
            subtitle: '',
            icon: <OtherSocialMediaIcon />
            },
            {
            url: 'add-account',
            title: pageTitles['/social-media/add-account'],
            subtitle: '',
            icon: <AddSocialMediaIcon />
            }
        ]
        },
        {
        url: 'events',
        title: 'Events',
        subtitle: '',
        icon: <EventIcon className="smallIcon" />,
        children: [
            {
            url: 'create-an-event',
            title: pageTitles['/events/create-an-event'],
            subtitle: '',
            icon: <AddEventIcon />
            },
            {
            url: 'view-events',
            title: pageTitles['/events/view-events'],
            subtitle: '',
            icon: <EventIcon />
            },
            {
            url: 'edit-events',
            title: pageTitles['/events/edit-events'],
            subtitle: '',
            icon: <EditEventsIcon />
            }
        ]
        },
        {
        url: 'security',
        title: 'Security',
        subtitle: '',
        icon: <EventIcon className="smallIcon" />,
        children: [
            {
            url: 'forgot-a-password',
            title: pageTitles['/security/forgot-a-password'],
            subtitle: '',
            icon: <ForgotPasswordIcon />
            },
            {
            url: 'change-a-password',
            title: pageTitles['/security/change-a-password'],
            subtitle: '',
            icon: <ChangePasswordIcon />
            },
            {
            url: 'ive-been-hacked',
            title: pageTitles['/security/ive-been-hacked'],
            subtitle: '',
            icon: <IveBeenHackedIcon />
            }
        ]
        },
        {
        url: 'bylaws-constitution',
        title: 'Bylaws / Constitution',
        subtitle: '',
        icon: <BoardIcon className="smallIcon" />,
        children: [
            {
            url: 'view-bylaws-constitution',
            title: pageTitles['/bylaws-constitution/view-bylaws-constitution'],
            subtitle: '',
            icon: <BylawsIcon />
            },
            {
            url: 'update-bylaws-constitution',
            title: pageTitles['/bylaws-constitution/update-bylaws-constitution'],
            subtitle: '',
            icon: <UpdateBylawsIcon />
            },
        ]
        },
        {
        url: 'podcasting',
        title: 'Podcasting',
        subtitle: '',
        icon: <BoardIcon className="smallIcon" />,
        children: [
            {
            url: 'view-podcast',
            title: pageTitles['/podcasting/view-podcast'],
            subtitle: '',
            icon: <PodcastIcon />
            },
            {
            url: 'start-a-podcast',
            title: pageTitles['/podcasting/start-a-podcast'],
            subtitle: '',
            icon: <StartPodcastIcon />
            },
        ]
        },
        {
        url: 'branding-personalization',
        title: 'Branding & Personalization',
        subtitle: '',
        icon: <BoardIcon className="smallIcon" />,
        children: [
            {
            url: 'change-branding-images',
            title: pageTitles['/branding-personalization/change-branding-images'],
            subtitle: '',
            icon: <BrandingImagesIcon />
            },
            {
            url: 'change-branding-colors',
            title: pageTitles['/branding-personalization/change-branding-colors'],
            subtitle: '',
            icon: <BrandingColorsIcon />
            },
        ]
        },
        {
        url: 'organization-info',
        title: 'Organization Info',
        subtitle: '',
        icon: <BoardIcon className="smallIcon" />,
        children: [
            {
            url: 'change-tagline-description',
            title: pageTitles['/organization-info/change-tagline-description'],
            subtitle: '',
            icon: <TaglineDescriptionIcon />
            },
            {
            url: 'change-mailing-address',
            title: pageTitles['/organization-info/change-mailing-address'],
            subtitle: '',
            icon: <MailingAddressIcon />
            },
            {
            url: 'change-phone-number',
            title: pageTitles['/organization-info/change-phone-number'],
            subtitle: '',
            icon: <PhoneNumberIcon />
            },
        ]
        },
        {
        url: 'get-help',
        title: pageTitles['/get-help'],
        subtitle: '',
        icon: <HelpIcon className="smallIcon" />,
        topLevel: true,
        },
        /*
        "/social-media/chat-on-discord": "Chat on Discord",
        "/social-media/upload-to-flickr": "Upload to Flickr",
        "/social-media/view-github": "View Github",
        "/social-media/post-to-instagram": "Post to Instagram",
        "/social-media/post-in-linkedin-group": "Post in LinkedIn Group",
        "/social-media/post-in-meetup-group": "Post in Meetup Group",
        "/social-media/post-to-medium": "Post to Medium",
        "/social-media/chat-in-messenger-group": "Chat in Messenger Group",
        "/social-media/post-to-pinterest": "Post to Pinterest",
        "/social-media/post-on-subreddit": "Post on Subreddit",
        "/social-media/chat-on-slack": "Chat on Slack",
        "/social-media/new-snap": "New Snap",
        "/social-media/post-to-tumblr": "Post to Tumblr",
        "/social-media/upload-to-twitch": "Upload to Twitch",
        "/social-media/chat-on-whatsapp": "Chat on WhatsApp",
        "/social-media/upload-to-youtube": "Upload to YouTube",
        */
    ],
    onboarding: [
        {
        url: 'get-started',
        title: 'Get Started',
        subtitle: '',
        icon: <WebsiteIcon className="smallIcon" />,
        children: [
            {
            url: 'organization-info',
            title: pageTitles['/get-started/organization-info'],
            subtitle: '',
            icon: <OrganizationInfoIcon />,
            completed: 100,
            },
            {
            url: 'website',
            title: pageTitles['/get-started/website'],
            subtitle: '',
            icon: <WebsiteIcon />,
            completed: 2,
            },
            {
            url: 'board',
            title: pageTitles['/get-started/board'],
            subtitle: '',
            icon: <BoardIcon />,
            completed: 75,
            },
            {
            url: 'email',
            title: pageTitles['/get-started/email'],
            subtitle: '',
            icon: <EmailIcon />,
            completed: 10,
            },
            {
            url: 'social-media',
            title: pageTitles['/get-started/social-media'],
            subtitle: '',
            icon: <SocialMediaIcon />,
            completed: 25,
            },
            {
            url: 'payments-finances',
            title: pageTitles['/get-started/payments-finances'],
            subtitle: '',
            icon: <PaymentsIcon />,
            completed: 2,
            },
            {
            url: 'analytics-seo',
            title: pageTitles['/get-started/analytics-seo'],
            subtitle: '',
            icon: <AnalyticsIcon />,
            completed: 80,
            },
            {
            url: 'podcasting',
            title: pageTitles['/get-started/podcasting'],
            subtitle: '',
            icon: <PodcastIcon />,
            completed: 100,
            },
            {
            url: 'bylaws-constitution',
            title: pageTitles['/get-started/bylaws-constitution'],
            subtitle: '',
            icon: <BylawsIcon />,
            completed: 2,
            },
            {
            url: 'branding-personalization',
            title: pageTitles['/get-started/branding-personalization'],
            subtitle: '',
            icon: <BrandingIcon />,
            completed: 60,
            },
        ]
        }
    ],
};

export {
    pageTitles,
    routes
};