class Letter {
    constructor() {
        this.provinces = [
            '京','津','晋','冀','蒙','辽','吉','黑',
            '沪','苏','浙','皖','闽','赣','鲁','豫',
            '鄂','湘','粤','桂','琼','渝','川','贵',
            '云','藏','陕','甘','青','宁','新'
        ]

        this.numbers = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 0
        ]

        this.letterPeople = [
            'A','B','C','D','E','F','G','H','J','K','W','X','Y','Z',
        ]

        this.study = [
            '学','警','港','澳','航','挂','试','超','使','领',
        ]

        this.letterHasI = [
            'Q','W','E','R','T','Y','U','I','O','P',
            'A','S','D','F','G','H','J','K','L','M',
            'Z','X','C','V','B','N'
        ]

        this.letterNotHasI = [
            'Q','W','E','R','T','Y','U','P','M','N',
            'A','S','D','F','G','H','J','K','L','B',
            'Z','X','C','V'
        ]

        this.letterMore = [
            'Q','W','E','R','T','Y','C','V','B','N',
            'A','S','D','F','G','H','J','K','L',
            'Z','X','民','使',
        ]
    }


    getProvinces() {
        return this.provinces
    }

    getNumberAndLetterHasI() {
        return this.numbers.concat(this.letterNotHasI)
    }

    getNumberAndLetterNotHasI() {
        return this.study.concat(this.numbers, this.letterNotHasI)
    }

    getStudy() {
        return this.study.concat(this.numbers, this.letterPeople)
    }

    getMore() {
        return this.numbers.concat(this.letterMore)
    }
}

let letter = new Letter()
export default letter