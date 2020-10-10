import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { pushData } from './LineChart.js';

const options = [
    '一小时内',
    '十二小时内'
];

const Hour = [
    '现在',
    '5分前',
    '10分前',
    '15分前',
    '20分前',
    '25分前',
    '30分前',
    '35分前',
    '40分前',
    '45分前',
    '50分前',
    '55分前',
    '60分前'
];

const halfDay = [
    '现在',
    '1时前',
    '2时前',
    '3时前',
    '4时前',
    '5时前',
    '6时前',
    '7时前',
    '8时前',
    '9时前',
    '10时前',
    '11时前',
    '12时前'
];

export default function MenuButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        handleChangeLabels(index);
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleChangeLabels = (index) => {
        for (let i = 0; i < 13; i++) {
            LineChart.data.labels.pop();
        }
        if (index) {
            for (let i = 0; i < 13; i++) {
                LineChart.data.labels.push(halfDay[12 - i]);
            }
        } else {
            for (let i = 0; i < 13; i++) {
                LineChart.data.labels.push(Hour[12 - i]);
            }
        }
        LineChart.update();
        pushData(index);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label='more'
                aria-controls='time-menu'
                aria-haspopup='true'
                onClick={handleClickListItem}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id='time-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
