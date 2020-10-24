import mutations from './mutations'

const names = {
    'DOWNLOADS_UPDATED': 'DOWNLOADS_UPDATED',
};

function downloadsUpdated (context, downloads) {
    context.commit(mutations.names.UPDATE_DOWNLOADS, downloads);
};

export default {
    map: {
        [names.DOWNLOADS_UPDATED]: downloadsUpdated,
    },
    names,
}