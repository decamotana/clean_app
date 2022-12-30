import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAnalytics,
	faBooks,
	faChartPieAlt,
	faCogs,
	faCommentDots,
	faHome,
	faUsers,
	// faNewspaper,
} from "@fortawesome/pro-light-svg-icons";

const CareProfessionalSideMenu = [
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: <FontAwesomeIcon icon={faHome} />,
	},
	{
		title: "Training Modules",
		path: "/training-modules",
		icon: <FontAwesomeIcon icon={faAnalytics} />,
	},
	{
		title: "Resource Library",
		path: "/resource-library",
		icon: <FontAwesomeIcon icon={faBooks} />,
		children: [
			{
				title: "Online Resources",
				path: "/resource-library/online-resources",
			},
			{
				title: "Video Resources",
				path: "/resource-library/video-resources",
			},
			{
				title: "PDF Resources",
				path: "/resource-library/pdf-resources",
			},
		],
	},
	{
		title: "Course Status",
		path: "/course-status",
		icon: <FontAwesomeIcon icon={faChartPieAlt} />,
		children: [
			{
				title: "Certificate of Completion",
				path: "/course-status/certificate-of-completion",
			},
		],
	},
	{
		title: "Subscribers",
		path: "/subscribers",
		icon: <FontAwesomeIcon icon={faUsers} />,
		children: [
			{
				title: "Current & Completed",
				path: "/subscribers/current-completed",
			},
			{
				title: "Reference Code",
				path: "/subscribers/reference-code",
			},
		],
	},
	{
		title: "Support",
		path: "/support",
		icon: <FontAwesomeIcon icon={faCogs} />,
		children: [
			{
				title: "FAQs",
				path: "/support/faqs",
			},
			{
				title: "Ticketing",
				path: "/support/ticketing",
			},
		],
	},
	{
		title: "Messages",
		path: "/message",
		icon: <FontAwesomeIcon icon={faCommentDots} />,
	},
	// {
	// 	title: "Community Feed",
	// 	path: "/feed",
	// 	icon: <FontAwesomeIcon icon={faNewspaper} />,
	// 	// permission: "Ticketing",
	// },
];

export default CareProfessionalSideMenu;