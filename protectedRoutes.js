import React from 'react';
import Management from './Management/ContentPane';

const protectedRoutes = [
	{
		name: 'management',
		exact: true,
		path: '/management',
		main: props => <Management {...props} />,
		public: false,
	},
];

export default protectedRoutes;