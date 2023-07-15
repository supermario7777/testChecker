import queryString from 'query-string';

export const performComparison = (textResult, textResult1) => {

    const modifyString1 = textResult.split(') ').join('=');
    const replacedStr1 = modifyString1.replace(/\s/g, '&');
    const newTextResult = replacedStr1.slice(0, -1)
    const textResultObject = queryString.parse(newTextResult);
    console.log(textResultObject)


    const modifyString2 = textResult1.split(') ').join('=');
    const replacedStr2 = modifyString2.replace(/\s/g, '&');
    const newTextResult1 = replacedStr2.slice(0, -1)
    const textResultObject1 = queryString.parse(newTextResult1);
    console.log(textResultObject1)

    const performComparisonFunc = (textResultObject, textResultObject1)=>{
        let countOfCorrectAnswers = 0;

        for (let key in textResultObject) {
            if (textResultObject && textResultObject1) {
                if (textResultObject[key] === textResultObject1[key]) {
                    countOfCorrectAnswers += 1
                }
            }
        }

        return countOfCorrectAnswers;
    }

    return `Count of correct answers ${performComparisonFunc(textResultObject, textResultObject1)} from ${Object.keys(textResultObject1).length}`;

}