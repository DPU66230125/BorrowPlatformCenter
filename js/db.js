const DB = {
    db: AceBase.WithIndexedDB('borrowsys'),
    initDB: async function(){
        await this.db.ref('test').set({ text: 'Borrow Platform Center - local db is ready via AceBase.' });
    
        const snap = await this.db.ref('test/text').get();
        console.log(snap.val());
    },
    login: async function(user){
        return await this.db.ref('user').set(user);
    },
    logout: async function(){
        return await this.db.ref('user').remove();
    },
    getUser: async function(){
        let user = null;
        const snapshot = await db.ref('user').get();
        if (snapshot.exists()) {
            user = snapshot.val();
        }
        return user;
    }
};

DB.initDB();