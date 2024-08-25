import React from 'react';
import { render, screen } from '@testing-library/react';
import Dummy from '../components/Todo/Dummy';
jest.mock('../hooks/useFeatureFlags', () => ({
    useFeatureFlag: jest.fn().mockReturnValue({flags:{
        enableSmartDefault: true,
        enableBetaFeature: false,
    }}),
}));

describe('Dummy', () => {
    it('renders the smart default enabled message when enableSmartDefault is true', () => {
        const { useFeatureFlag } = require('../hooks/useFeatureFlags');
        useFeatureFlag.mockReturnValue({flags:{
            enableSmartDefault: true,
            enableBetaFeature: false,
        }}); // Mock the return value as true
        screen.debug()
        render(<Dummy />);
        expect(screen.getByText('Smart default enabled')).toBeInTheDocument();
    });
});
