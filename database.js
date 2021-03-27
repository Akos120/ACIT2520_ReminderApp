let Database = {
    cindy: {
        reminders: [{id: 1, title: "abc", description: "abcabc", tag: "test", completed: false}]
    },
    alex: {
        reminders: [{id: 2, title: "alex", description: "784516", completed: false}]
    } 
}

let Account=[
    {
        id: 1,
        name: "cindy",
        email: "cindy123@gmail.com",
        password: "cindy123!",
      },
      {
        id: 2,
        name: "alex",
        email: "alex123@gmail.com",
        password: "alex123!",
      },
]

const userModel = {
findOne: (email) => {
    const user = Account.find((user) => user.email === email);
    if (user) {
    return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
},

findById: (id) => {
    const user = Account.find((user) => user.id === id);
    if (user) {
    return user;
    }
},
};


module.exports = {Database,Account,userModel};
