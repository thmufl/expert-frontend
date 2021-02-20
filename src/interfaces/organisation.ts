import User from "./user";

type Organisation = {
    _id: string
    name: string
    description: string,
    director: User,
    board: User[],
    members: User[]
    suborganisations: Organisation[]
}

export default Organisation;