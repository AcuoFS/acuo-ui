// libraries
import _ from 'lodash'


const jsonObjectToFlatArray = (jsonObject) => {

    const outputJsonData = []

    // for each type
    _(jsonObject).each(type => {
        let currType = type.type


        // for each status in same type
        _(type.marginStatus).each(status => {
            let currStatus = status.status

            // for each timeframe in same status
            _(status.timeFrames).each(timeFrame => {
                let currTimeFrame = timeFrame.timeRangeStart

                // for each action within same timeFrame
                _(timeFrame.actionsList).each(action => {
                    outputJsonData.push(_.merge({
                        type: currType,
                        status: currStatus,
                        timeFrame: currTimeFrame
                    }, action))
                })
            })
        })
    })

    return outputJsonData;
}

export default jsonObjectToFlatArray