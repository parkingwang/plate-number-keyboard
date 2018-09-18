class Letter {
    constructor() {
        this.provinces = [
            '京',
            '津'
        ]

        this.numbers = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 0
        ]

        this.people = [
            'Q',
            '民',
            '使'
        ]

        this.study = [
            '学',
            '警',
            '港'
        ]

        this.letterHasI = [
            'A',
            'Z'
        ]

        this.letterNotHasI = [
            'A',
            'Z'
        ]
    }


    getProvinces() {
        return this.provinces
    }

    getNumberAndLetterHasI() {
        return this.numbers.concat(this.letterHasI)
    }

    getNumberAndLetterNotHasI() {
        return this.numbers.concat(this.letterNotHasI)
    }

    getStudy() {
        return this.study
    }

    getPeople() {
        return this.people
    }
}

let letter = new Letter()
export default letter