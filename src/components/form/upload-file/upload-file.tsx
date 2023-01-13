import React, {FC, useRef, useState} from 'react';
import {FileCard, FileInputs, FileItem, Info, Main} from "./upload-file-styled";
import ButtonMui from "../../ui-components/button-mui/button-mui";
import {AddCircleOutlineOutlined} from "@mui/icons-material";

interface uploadFileInterface {
    files: any;
    setFile: Function;
    accept: string;
    countFiles: number;
}

const UploadFile: FC<uploadFileInterface> = ({files, setFile, accept, countFiles}) => {
    const ref = useRef<HTMLInputElement>(null);
    const [drag, setDrag] = useState(false);

    const dragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDrag(true);
    }

    const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDrag(false);
    }

    const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        // @ts-ignore
        if (!event.dataTransfer.files || event.dataTransfer.files.length !== countFiles) return;

        // @ts-ignore
        const files = [...event.dataTransfer?.files];

        setFile(files);

        setDrag(false);
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFile(event.target.files[0]);
    }

    return (
        <>
            <FileCard
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e => onDropHandler(e)}
                onClick={() => ref.current?.click()}
            >
                {
                    drag ? (
                        <>
                            <Main>Release the files to download them</Main>
                        </>
                    ) : (
                        <>
                            <Main>Click to select or Drag and drop image here....</Main>
                            <input
                                type="file"
                                accept={accept}
                                ref={ref}
                                hidden
                                onChange={onChangeHandler}
                            />
                        </>
                    )
                }
            </FileCard>
            {
                files ? (
                    <>
                        {
                            files.length ? (<ul>
                                {
                                    files.map((file: File) => (
                                        <FileItem key={file.name}>
                                            <p>{file.name}</p>
                                        </FileItem>
                                    ))
                                }
                            </ul>) : <FileItem key={files.name}>
                                <p>{files.name}</p>
                            </FileItem>
                        }
                    </>
                ) : <div>Files have not been uploaded</div>
            }
        </>
    );
};

export default UploadFile;