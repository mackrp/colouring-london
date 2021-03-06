import React, { Component, Fragment } from 'react';

import { dataFields } from '../../data_fields';
import { CopyProps } from '../data-containers/category-view-props';

import NumericDataEntry from './numeric-data-entry';

interface YearDataEntryProps {
    year: number;
    upper: number;
    lower: number;
    copy?: CopyProps;
    mode?: 'view' | 'edit' | 'multi-edit';
    onChange?: (key: string, value: any) => void;
}

class YearDataEntry extends Component<YearDataEntryProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            year: props.year,
            upper: props.upper,
            lower: props.lower,
            decade: Math.floor(props.year / 10) * 10,
            century: Math.floor(props.year / 100) * 100
        };
    }
    // TODO add dropdown for decade, century
    // TODO roll in first/last year estimate
    // TODO handle changes internally, reporting out date_year, date_upper, date_lower
    render() {
        const props = this.props;

        const currentYear = new Date().getFullYear();
        return (
            <Fragment>
                <NumericDataEntry
                    title={dataFields.date_year.title}
                    slug="date_year"
                    value={props.year}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    min={1}
                    max={currentYear}
                    // "type": "year_estimator"
                    />
                <NumericDataEntry
                    title={dataFields.date_upper.title}
                    slug="date_upper"
                    value={props.upper}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    max={currentYear}
                    tooltip={dataFields.date_upper.tooltip}
                    />
                <NumericDataEntry
                    title={dataFields.date_lower.title}
                    slug="date_lower"
                    value={props.lower}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    max={currentYear}
                    tooltip={dataFields.date_lower.tooltip}
                    />
            </Fragment>
        );
    }
}

export default YearDataEntry;
