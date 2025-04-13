interface Member {
    fname: string,
    lname: string,
    phone: string,
    pid: string,
    email: string,
    gender: number,
    country: 'SE' | 'NE'
}

interface AA {
    fname: string,
    lname: string,
    phone: string,
    pid: string,

}

export {
    type Member,
    type AA
}