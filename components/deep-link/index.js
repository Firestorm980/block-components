/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useBlockEditContext } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { select, dispatch } from '@wordpress/data';
import { TextControl } from '@wordpress/components';
import { ClipboardButton } from '../clipboard-button';

export const DeepLink = (props) => {
	const [deeplink, setDeeplink] = useState('');
	const [componentAnchor, setComponentAnchor] = useState('');
	const { clientId } = useBlockEditContext();
	const attributes = select('core/block-editor').getBlockAttributes(clientId);
	const permalink = select('core/editor').getPermalink();

	const handleOnChange = (value) => {
		setComponentAnchor(value);
		dispatch('core/block-editor').updateBlockAttributes(clientId, { anchor: value });
	};

	useEffect(() => {
		if (attributes?.anchor) {
			setDeeplink(`${permalink}#${attributes.anchor}`);
		} else {
			setDeeplink(permalink);
		}
	}, [attributes, permalink]);

	return (
		<>
			<TextControl
				label={__('HTML Anchor')}
				value={componentAnchor}
				onChange={handleOnChange}
				help={__(
					'Enter a word or two — without spaces — to make a unique web address just for this block, called an “anchor.” Then, you’ll be able to link directly to this section of your page.',
				)}
			/>
			<TextControl
				label={__('Deep Link')}
				value={deeplink}
				help={__('This URL will be generated from the anchor and the current permalink.')}
				readOnly
			/>
			<ClipboardButton
				text={deeplink}
				labels={{ copy: __('Copy text'), copied: __('Text copied!') }}
				disabled={!attributes?.anchor?.trim().length}
			/>
		</>
	);
};

DeepLink.defaultProps = {};

DeepLink.propTypes = {};
