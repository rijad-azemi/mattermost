// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import * as React from 'react';

type SvgProps = {
    width?: number;
    height?: number;
}

const SvgComponent = (props: SvgProps) => (
    <svg
        width={props.width ? props.width.toString() : '376'}
        height={props.height ? props.height.toString() : '376'}
        fill='var(--center-channel-bg)'
        viewBox='0 0 376 376'
        xmlns='http://www.w3.org/2000/svg'
    >
        <rect
            x={170}
            y={309}
            width={35}
            height={6}
            rx={3}
            fill='#8D93A5'
        />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M257.145 327.922C253.231 331.929 247.65 335 241.529 335H134.471C128.35 335 122.769 331.929 118.855 327.922C114.932 323.906 112 318.258 112 312.145V63.8552C112 57.7407 114.927 52.0924 118.849 48.0755C122.763 44.0673 128.342 41 134.461 41H241.529C247.648 41 253.228 44.0666 257.144 48.0738C261.069 52.0897 264 57.7384 264 63.8552V312.145C264 318.258 261.068 323.906 257.145 327.922ZM241.529 329C249.765 329 258 320.563 258 312.145V63.8552C258 55.4276 249.765 47 241.529 47H134.461C126.226 47 118 55.4276 118 63.8552V312.145C118 320.563 126.235 329 134.471 329H241.529Z'
            fill='#363A45'
        />
        <path
            d='M258 312.145C258 320.563 249.765 329 241.529 329H134.471C126.235 329 118 320.563 118 312.145V63.8552C118 55.4276 126.226 47 134.461 47H241.529C249.765 47 258 55.4276 258 63.8552V312.145Z'
            fill='#3F4350'
        />
        <path
            d='M200 61.4966C200 62.328 199.474 63 198.81 63H177.199C176.544 63 176 62.3072 176 61.4966C176 60.6859 176.544 60 177.199 60H198.773C199.437 60 200 60.6721 200 61.4966Z'
            fill='#8D93A5'
        />
        <path
            d='M252 78H124V299H252V78Z'
            fill='white'
        />
        <path
            opacity={0.85}
            d='M252 78H124V299H252V78Z'
            fill='#3F4350'
        />
        <path
            d='M150.287 88.6721H136.089C134.122 88.6721 132.527 90.2684 132.527 92.2375V106.451C132.527 108.42 134.122 110.016 136.089 110.016H150.287C152.254 110.016 153.849 108.42 153.849 106.451V92.2375C153.849 90.2684 152.254 88.6721 150.287 88.6721Z'
            fill='#32A4EC'
        />
        <path
            d='M180.162 88.6721H165.964C163.997 88.6721 162.402 90.2684 162.402 92.2375V106.451C162.402 108.42 163.997 110.016 165.964 110.016H180.162C182.129 110.016 183.724 108.42 183.724 106.451V92.2375C183.724 90.2684 182.129 88.6721 180.162 88.6721Z'
            fill='#339970'
        />
        <path
            d='M210.012 88.6721H195.814C193.847 88.6721 192.252 90.2684 192.252 92.2375V106.451C192.252 108.42 193.847 110.016 195.814 110.016H210.012C211.979 110.016 213.573 108.42 213.573 106.451V92.2375C213.573 90.2684 211.979 88.6721 210.012 88.6721Z'
            fill='#FFBC1F'
        />
        <path
            d='M239.91 88.6721H225.688C223.721 88.6721 222.126 90.2684 222.126 92.2375V106.451C222.126 108.42 223.721 110.016 225.688 110.016H239.91C241.877 110.016 243.471 108.42 243.471 106.451V92.2375C243.471 90.2684 241.877 88.6721 239.91 88.6721Z'
            fill='#32A4EC'
        />
        <path
            d='M150.287 269H136.089C134.122 269 132.527 270.596 132.527 272.565V286.779C132.527 288.748 134.122 290.344 136.089 290.344H150.287C152.254 290.344 153.849 288.748 153.849 286.779V272.565C153.849 270.596 152.254 269 150.287 269Z'
            fill='#C43133'
        />
        <path
            d='M180.162 269H165.964C163.997 269 162.402 270.596 162.402 272.565V286.779C162.402 288.748 163.997 290.344 165.964 290.344H180.162C182.129 290.344 183.724 288.748 183.724 286.779V272.565C183.724 270.596 182.129 269 180.162 269Z'
            fill='#339970'
        />
        <path
            d='M210.012 269H195.814C193.847 269 192.252 270.596 192.252 272.565V286.779C192.252 288.748 193.847 290.344 195.814 290.344H210.012C211.979 290.344 213.573 288.748 213.573 286.779V272.565C213.573 270.596 211.979 269 210.012 269Z'
            fill='#32A4EC'
        />
        <path
            d='M239.91 269H225.688C223.721 269 222.126 270.596 222.126 272.565V286.779C222.126 288.748 223.721 290.344 225.688 290.344H239.91C241.877 290.344 243.471 288.748 243.471 286.779V272.565C243.471 270.596 241.877 269 239.91 269Z'
            fill='#1279BA'
        />
        <path
            d='M150.287 170.895H136.089C134.122 170.895 132.527 172.492 132.527 174.461V188.674C132.527 190.643 134.122 192.239 136.089 192.239H150.287C152.254 192.239 153.849 190.643 153.849 188.674V174.461C153.849 172.492 152.254 170.895 150.287 170.895Z'
            fill='#339970'
        />
        <path
            d='M180.162 170.895H165.964C163.997 170.895 162.402 172.492 162.402 174.461V188.674C162.402 190.643 163.997 192.239 165.964 192.239H180.162C182.129 192.239 183.724 190.643 183.724 188.674V174.461C183.724 172.492 182.129 170.895 180.162 170.895Z'
            fill='#1279BA'
        />
        <path
            d='M210.012 170.895H195.814C193.847 170.895 192.252 172.492 192.252 174.461V188.674C192.252 190.643 193.847 192.239 195.814 192.239H210.012C211.979 192.239 213.573 190.643 213.573 188.674V174.461C213.573 172.492 211.979 170.895 210.012 170.895Z'
            fill='#32A4EC'
        />
        <path
            d='M150.287 143.487H136.089C134.122 143.487 132.527 145.084 132.527 147.053V161.266C132.527 163.235 134.122 164.831 136.089 164.831H150.287C152.254 164.831 153.849 163.235 153.849 161.266V147.053C153.849 145.084 152.254 143.487 150.287 143.487Z'
            fill='#C43133'
        />
        <path
            d='M180.162 143.487H165.964C163.997 143.487 162.402 145.084 162.402 147.053V161.266C162.402 163.235 163.997 164.831 165.964 164.831H180.162C182.129 164.831 183.724 163.235 183.724 161.266V147.053C183.724 145.084 182.129 143.487 180.162 143.487Z'
            fill='#FFBC1F'
        />
        <path
            d='M210.012 143.487H195.814C193.847 143.487 192.252 145.084 192.252 147.053V161.266C192.252 163.235 193.847 164.831 195.814 164.831H210.012C211.979 164.831 213.573 163.235 213.573 161.266V147.053C213.573 145.084 211.979 143.487 210.012 143.487Z'
            fill='#339970'
        />
        <path
            d='M239.91 143.487H225.688C223.721 143.487 222.126 145.084 222.126 147.053V161.266C222.126 163.235 223.721 164.831 225.688 164.831H239.91C241.877 164.831 243.471 163.235 243.471 161.266V147.053C243.471 145.084 241.877 143.487 239.91 143.487Z'
            fill='#FFBC1F'
        />
        <path
            d='M150.287 116.08H136.089C134.122 116.08 132.527 117.676 132.527 119.645V133.858C132.527 135.827 134.122 137.424 136.089 137.424H150.287C152.254 137.424 153.849 135.827 153.849 133.858V119.645C153.849 117.676 152.254 116.08 150.287 116.08Z'
            fill='#1279BA'
        />
        <path
            d='M180.162 116.08H165.964C163.997 116.08 162.402 117.676 162.402 119.645V133.858C162.402 135.827 163.997 137.424 165.964 137.424H180.162C182.129 137.424 183.724 135.827 183.724 133.858V119.645C183.724 117.676 182.129 116.08 180.162 116.08Z'
            fill='#32A4EC'
        />
        <path
            d='M210.012 116.08H195.814C193.847 116.08 192.252 117.676 192.252 119.645V133.858C192.252 135.827 193.847 137.424 195.814 137.424H210.012C211.979 137.424 213.573 135.827 213.573 133.858V119.645C213.573 117.676 211.979 116.08 210.012 116.08Z'
            fill='#C43133'
        />
        <path
            d='M239.91 116.08H225.688C223.721 116.08 222.126 117.676 222.126 119.645V133.858C222.126 135.827 223.721 137.424 225.688 137.424H239.91C241.877 137.424 243.471 135.827 243.471 133.858V119.645C243.471 117.676 241.877 116.08 239.91 116.08Z'
            fill='#1279BA'
        />
    </svg>
);

export default SvgComponent;