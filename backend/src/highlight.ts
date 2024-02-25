import { config } from "dotenv";
import { H } from '@highlight-run/node'

config();

export const highlightConfig = {
	projectID: process.env.HIGHLIGHT_PROJECT_ID,
	serviceName: 'cause-harbour',
	serviceVersion: 'git-sha'
}

H.init(highlightConfig);