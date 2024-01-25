// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type {ChangeEvent, ClipboardEventHandler, FocusEventHandler, MouseEvent} from 'react';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FormattedMessage, defineMessages, useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import {PencilOutlineIcon} from '@mattermost/compass-icons/components';
import {GenericModal} from '@mattermost/components';
import type {ChannelBookmark, ChannelBookmarkCreate, ChannelBookmarkPatch} from '@mattermost/types/channel_bookmarks';
import type {FileInfo} from '@mattermost/types/files';

import {debounce} from 'mattermost-redux/actions/helpers';
import {Client4} from 'mattermost-redux/client';
import {getFile} from 'mattermost-redux/selectors/entities/files';
import type {ActionResult} from 'mattermost-redux/types/actions';

import type {UploadFile} from 'actions/file_actions';
import {uploadFile} from 'actions/file_actions';

import FileAttachment from 'components/file_attachment';
import type {FilePreviewInfo} from 'components/file_preview/file_preview';
import FileProgressPreview from 'components/file_preview/file_progress_preview';
import Input from 'components/widgets/inputs/input/input';

import {isValidUrl} from 'utils/url';
import {generateId} from 'utils/utils';

import type {GlobalState} from 'types/store';

import './bookmark_create_modal.scss';

import CreateModalNameInput from './create_modal_name_input';

type Props = {
    channelId: string;
    bookmarkType?: ChannelBookmark['type'];
    file?: File;
    onExited: () => void;
    onHide: () => void;
} & ({
    bookmark: ChannelBookmark;
    onConfirm: (data: ChannelBookmarkPatch) => Promise<ActionResult<boolean, any>> | ActionResult<boolean, any>;
} | {
    bookmark?: never;
    onConfirm: (data: ChannelBookmarkCreate) => Promise<ActionResult<boolean, any>> | ActionResult<boolean, any>;
})

function validHttpUrl(val: string) {
    if (!isValidUrl(val)) {
        return null;
    }

    let url;
    try {
        url = new URL(val);
    } catch {
        return null;
    }

    return url;
}

function ChannelBookmarkCreateModal({
    bookmark,
    bookmarkType,
    file: promptedFile,
    channelId,
    onExited,
    onConfirm,
    onHide,
}: Props) {
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();

    // common
    const type = bookmark?.type ?? bookmarkType ?? 'link';
    const [emoji, setEmoji] = useState(bookmark?.emoji);
    const [displayName, setDisplayName] = useState<string | undefined>(bookmark?.display_name);
    const [parsedDisplayName, setParsedDisplayName] = useState<string | undefined>();
    const displayNameValue = displayName || (parsedDisplayName ?? '');

    // type === 'link'
    const [linkInputValue, setLinkInputValue] = useState(bookmark?.link_url ?? '');
    const [link, setLinkImmediately] = useState(linkInputValue);
    const [linkError, setLinkError] = useState('');
    const [icon, setIcon] = useState(bookmark?.image_url);

    const handleLinkChange = useCallback(({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        setLinkInputValue(value);
        setLink(value);
    }, []);

    const setLink = debounce((val: string) => {
        setLinkImmediately(val);
    }, 250);

    const handleLinkBlur: FocusEventHandler<HTMLInputElement> = useCallback(({target: {value}}) => {
        setLinkImmediately(value);
    }, []);

    const handleLinkPasted: ClipboardEventHandler<HTMLInputElement> = useCallback(({clipboardData}) => {
        setLinkImmediately(clipboardData.getData('text/plain'));
    }, []);

    useEffect(() => {
        if (linkInputValue === bookmark?.link_url) {
            return;
        }

        const url = validHttpUrl(linkInputValue);

        if (url) {
            setLinkError('');
        } else if (linkInputValue) {
            setLinkError(formatMessage(msg.linkHttpInvalid));
        }
    }, [linkInputValue, bookmark?.link_url]);

    const resetParsed = () => {
        setParsedDisplayName(link || '');
        setIcon('');
    };

    useEffect(() => {
        if (link === bookmark?.link_url) {
            return;
        }

        const url = validHttpUrl(link);
        (async () => {
            let meta;

            if (!url) {
                resetParsed();
                return;
            }

            try {
                meta = await Client4.fetchChannelBookmarkOpenGraph(channelId, url.toString());

                const {title, images} = meta;

                setParsedDisplayName(title || link);

                const favicon = images?.find(({type}) => type === 'favicon')?.url;
                setIcon(favicon || '');
            } catch {
                resetParsed();
            }
        })();
    }, [link, bookmark?.link_url]);

    // type === 'file'
    const [file, setFile] = useState<File | null>(promptedFile ?? null);
    const [fileId, setFileId] = useState(bookmark?.file_id);
    const [fileError, setFileError] = useState('');
    const [pendingFile, setPendingFile] = useState<FilePreviewInfo | null>();
    const uploadRequestRef = useRef<XMLHttpRequest>();
    const fileInfo: FileInfo | undefined = useSelector((state: GlobalState) => (fileId && getFile(state, fileId)) || undefined);

    const handleEditFileClick = (e: MouseEvent<HTMLDivElement>) => {
        const innerClick = document.querySelector(`
            .channel-bookmarks-create-modal .post-image__download a,
            .channel-bookmarks-create-modal a.file-preview__remove
        `);
        if (
            innerClick === e.target ||
            innerClick?.contains(e.target as HTMLElement)
        ) {
            return;
        }

        fileInputRef.current?.click();
    };

    const handleFileChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
        }
    }, []);

    const handleFileRemove = () => {
        setFile(null);
        setPendingFile(null);
        setFileId(bookmark?.file_id);
        setParsedDisplayName(undefined);
        uploadRequestRef.current?.abort();
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileInput = (
        <input
            type='file'
            id='bookmark-create-file-input'
            className='bookmark-create-file-input'
            ref={fileInputRef}
            onChange={handleFileChanged}
        />
    );

    const onProgress: UploadFile['onProgress'] = (preview) => {
        setPendingFile(preview);
    };
    const onSuccess: UploadFile['onSuccess'] = ({file_infos: fileInfos}) => {
        setPendingFile(null);
        const newFile: FileInfo = fileInfos?.[0];
        if (newFile) {
            setFileId(newFile.id);
        }
    };
    const onError: UploadFile['onError'] = () => {
        setPendingFile(null);
    };

    useEffect(() => {
        if (!file) {
            return;
        }

        setParsedDisplayName(file?.name);

        const clientId = generateId();

        uploadRequestRef.current = dispatch(uploadFile({
            file,
            name: file.name,
            type: file.type,
            rootId: '',
            channelId,
            clientId,
            onProgress,

            onSuccess,
            onError,
        })) as unknown as XMLHttpRequest;

        setFile(null);
    }, [file]);

    const handleOnExited = () => {
        handleFileRemove();
        onExited?.();
    };

    // controls logic
    const hasChanges = (() => {
        if (displayNameValue && displayNameValue !== bookmark?.display_name) {
            return true;
        }

        if (emoji !== bookmark?.emoji) {
            return true;
        }

        if (type === 'file') {
            return Boolean(fileId && fileId !== bookmark?.file_id);
        }

        if (type === 'link') {
            return Boolean(link && link !== bookmark?.link_url);
        }

        return false;
    })();
    const isValid = type === 'file' ? fileInfo && displayNameValue && !fileError : link && !linkError;
    const showControls = type === 'file' || (isValid || bookmark);

    const cancel = () => {};
    const confirm = async () => {
        if (type === 'link') {
            const {data: success} = await onConfirm({
                image_url: icon,
                link_url: link,
                emoji,
                display_name: displayNameValue,
                type: 'link',
            });

            if (success) {
                setLinkError('');
                onHide();
            } else {
                setLinkError(formatMessage(msg.linkInvalid));
            }
        } else if (fileInfo) {
            const {data: success} = await onConfirm({
                file_id: fileInfo.id,
                display_name: displayNameValue,
                type: 'file',
                emoji,
            });

            if (success) {
                setFileError('');
                onHide();
            } else {
                //setFileError('');
            }
        }
    };

    return (
        <GenericModal
            className='channel-bookmarks-create-modal'
            modalHeaderText={formatMessage(bookmark ? msg.editHeading : msg.heading)}
            confirmButtonText={formatMessage(bookmark ? msg.saveText : msg.addBookmarkText)}
            handleCancel={(showControls && cancel) || undefined}
            handleConfirm={(showControls && confirm) || undefined}
            onExited={handleOnExited}
            compassDesign={true}
            isConfirmDisabled={!isValid || !hasChanges}
            autoCloseOnConfirmButton={false}
        >
            <>
                {type === 'link' ? (
                    <Input
                        type='text'
                        containerClassName='linkInput'
                        placeholder={formatMessage(msg.linkPlaceholder)}
                        onChange={handleLinkChange}
                        onBlur={handleLinkBlur}
                        onPaste={handleLinkPasted}
                        value={linkInputValue}
                        data-testid='linkInput'
                        autoFocus={true}
                        customMessage={linkError ? {type: 'error', value: linkError} : {value: formatMessage(msg.linkInfoMessage)}}
                    />
                ) : (
                    <>
                        <FieldLabel>
                            <FormattedMessage
                                id='channel_bookmarks.create.file_input.label'
                                defaultMessage='Attachment'
                            />
                        </FieldLabel>
                        <FileInputContainer
                            tabIndex={0}
                            role='button'
                            onClick={handleEditFileClick}
                        >
                            {!file && !pendingFile && fileInfo && (
                                <FileItemContainer>
                                    <FileAttachment
                                        key={fileInfo.id}
                                        fileInfo={fileInfo}
                                        index={0}
                                    />
                                </FileItemContainer>
                            )}
                            {pendingFile && (
                                <FileProgressPreview
                                    key={pendingFile.clientId}
                                    clientId={pendingFile.clientId}
                                    fileInfo={pendingFile}
                                    handleRemove={handleFileRemove}
                                />
                            )}
                            {!fileInfo && !pendingFile && (
                                <div className='file-preview__container empty'/>
                            )}
                            <VisualButton>
                                <PencilOutlineIcon size={24}/>
                                {formatMessage(msg.fileInputEdit)}
                            </VisualButton>
                            {fileInput}
                        </FileInputContainer>
                    </>

                )}

                {showControls && (
                    <TitleWrapper>
                        <FieldLabel>
                            <FormattedMessage
                                id='channel_bookmarks.create.title_input.label'
                                defaultMessage='Title'
                            />
                        </FieldLabel>
                        <CreateModalNameInput
                            type={type}
                            imageUrl={icon}
                            fileInfo={pendingFile || fileInfo}
                            emoji={emoji}
                            setEmoji={setEmoji}
                            displayName={displayName}
                            placeholder={parsedDisplayName}
                            setDisplayName={setDisplayName}
                        />
                    </TitleWrapper>
                )}
            </>
        </GenericModal>
    );
}

export default ChannelBookmarkCreateModal;

const TitleWrapper = styled.div`
    margin-top: 20px;
`;

const FieldLabel = styled.span`
    display: inline-block;
    margin-bottom: 8px;
    font-family: Open Sans;
    font-size: 14px;
    line-height: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
`;

const FileInputContainer = styled.div`
    display: block;
    background: rgba(var(--center-channel-color-rgb), 0.04);
    padding: 12px;
    border-radius: 8px;
    display: flex;

    &:hover {
        background: rgba(var(--center-channel-color-rgb), 0.08);
        color: rgba(var(--center-channel-color-rgb), 0.72);
        cursor: pointer;
    }

    input[type="file"] {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .file-preview__container,
    .file-preview {
        width: auto;
        height: auto;
        flex: 1 1 auto;
        padding: 0;

        &.empty {
            border: 2px dashed rgba(var(--center-channel-color-rgb), 0.16);
            border-radius : 8px;
        }

        .post-image__column {
            width: 100%;
            margin: 0;
        }
    }
`;

const VisualButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px 24px;
    color: rgba(var(--center-channel-color-rgb), 0.56);
    font-size: 11px;
    font-weight: 600;
    font-family: Open Sans;
`;

const FileItemContainer = styled.div`
    display: flex;
    flex: 1 1 auto;

    > div {
        width: 100%;
        margin: 0;
    }
`;

const msg = defineMessages({
    heading: {id: 'channel_bookmarks.create.title', defaultMessage: 'Add a bookmark'},
    editHeading: {id: 'channel_bookmarks.create.edit.title', defaultMessage: 'Edit bookmark'},
    linkPlaceholder: {id: 'channel_bookmarks.create.link_placeholder', defaultMessage: 'Link'},
    linkInfoMessage: {id: 'channel_bookmarks.create.link_info', defaultMessage: 'Add a link to any post, file, or any external link'},
    addBookmarkText: {id: 'channel_bookmarks.create.confirm_add.button', defaultMessage: 'Add bookmark'},
    saveText: {id: 'channel_bookmarks.create.confirm_save.button', defaultMessage: 'Save bookmark'},
    fileInputEdit: {id: 'channel_bookmarks.create.file_input.edit', defaultMessage: 'Edit'},
    linkInvalid: {id: 'channel_bookmarks.create.error.invalid_url', defaultMessage: 'Please enter a valid link'},
    linkHttpInvalid: {id: 'channel_bookmarks.create.error.invalid_url_needs_http', defaultMessage: 'Please enter a valid link beginning with http:// or https://'},
});
