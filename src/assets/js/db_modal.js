// @ts-nocheck
const IDB = {
    db: null,
    database: 'eyenak',
    db_version: 1,
    tables: {
        user: 'users',
        group: 'groups'
    },

    init: async () => {
        console.log('DB Creating');
        IDB.db = await idb.openDb(IDB.database, IDB.db_version, db => {
            console.log('DB Created');

            // Create Users ObjectStore
            const users = db.createObjectStore(IDB.tables.user, { keyPath: 'ref_id' });
            users.createIndex('drdsh_idx', 'id');
            users.createIndex('drdsh_company_idx', 'company_id');

            // Create Groups ObjectStore
            const group = db.createObjectStore(IDB.tables.group, { keyPath: 'id' });
            group.createIndex('is_private_idx', 'is_private');
        });
    },

    deleteDB: async () => {
        console.log('Deleting DB');
        await idb.deleteDb(IDB.database);
    },


    // User Fns
    addUser: async user => {
        try {
            let trans = IDB.db.transaction(IDB.tables.user, 'readwrite');
            await trans.objectStore(IDB.tables.user).put({
                company_id: user.company_id,
                id: user.id,
                ref_id: user.ref_id,
                name: user.name,
                image: user.image,
            });
            return true;
        } catch (err) {
            console.log('Error while adding user.');
            return false;
        }
    },

    getUsersList: async () => {
        let trans = IDB.db.transaction(IDB.tables.user, 'readonly');
        let store = trans.objectStore(IDB.tables.user);
        return await store.getAll();
    },

    getUser: async ref_id => {
        let trans = IDB.db.transaction(IDB.tables.user, 'readonly');
        let store = trans.objectStore(IDB.tables.user);
        return await store.get(ref_id);
    },

    deleteDBUser: async el => {
        let trans = IDB.db.transaction(IDB.tables.user, 'readwrite');
        let store = trans.objectStore(IDB.tables.user);
        return await store.delete(el.ref_id);
    },

    deleteAllDBUser: async el => {
        let trans = IDB.db.transaction(IDB.tables.user, 'readwrite');
        let store = trans.objectStore(IDB.tables.user);
        return await store.clear();
    },


    // Group Fns
    addGroup: async (group, users) => {
        try {
            let trans = IDB.db.transaction(IDB.tables.group, 'readwrite');

            let participants = [];
            users.forEach(user => {
                let index = participants.findIndex(el => el.agent_id == user.agent_id);
                if (index < 0) {
                    participants.push(user);
                }
            });


            const groupObj = {
                id: group._id === undefined ? group.id : group._id,
                name: group.name,
                name_initials: group.name_initials === undefined ? '' : group.name_initials,
                image: group.image ? group.image : null,
                from_id: group.agent_id === undefined ? group.from_id : group.agent_id,
                to_id: group.to_agent_id === undefined ? group.to_id : group.to_agent_id,
                users: participants,
                is_one_to_one: group.is_one_to_one === undefined ? false : group.is_one_to_one
            };

            await trans.objectStore(IDB.tables.group).put(groupObj);
            return groupObj;
        } catch (err) {
            console.log('Error while adding group.');
            console.log(err);
            return false;
        }
    },

    getGroupsList: async () => {
        let trans = IDB.db.transaction(IDB.tables.group, 'readonly');
        let store = trans.objectStore(IDB.tables.group);
        return await store.getAll();
    },

    getGroup: async id => {
        let trans = IDB.db.transaction(IDB.tables.group, 'readonly');
        let store = trans.objectStore(IDB.tables.group);
        return await store.get(id);
    },

    deleteDBGroup: async id => {
        let trans = IDB.db.transaction(IDB.tables.group, 'readwrite');
        let store = trans.objectStore(IDB.tables.group);
        return await store.delete(id);
    },

    deleteAllDBGroup: async el => {
        let trans = IDB.db.transaction(IDB.tables.group, 'readwrite');
        let store = trans.objectStore(IDB.tables.group);
        return await store.clear();
    },
};

// Handle Exceptions
// window.addEventListener('unhandledrejection', e => console.error(e.reason.message));