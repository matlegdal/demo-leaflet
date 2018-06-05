import * as env from './env';
const API_URL = 'https://route.api.here.com/routing/7.2/calculateroute..json?';

export async function getRoutes(from, to, params) {
    let url = queryBuilder(from, to, params);
    return fetch(url)
        .then(res => res.json());
}

export function coordsToWaypointString(coords) {
    return `geo!${coords.lat},${coords.lng}`;
}

function queryBuilder(from, to, params) {
    let url = API_URL + `app_id=${env.APP_ID}&app_code=${env.APP_CODE}`;
    url += '&waypoint0=' + coordsToWaypointString(from);
    url += '&waypoint1=' + coordsToWaypointString(to);
    url += '&mode=fastest;car';
    return url;
}