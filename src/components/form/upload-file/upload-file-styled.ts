import styled from "styled-components";

export const FileCard = styled.div`
  background-color: #edf2f7;
  border: 3px dashed #cbd5e0;
  border-radius: 6px;
  padding: 1em;
  min-width: 380px;
  min-height: 130px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FileInputs = styled.div`
  position: relative;
  margin-bottom: 1.5em;

  input {
    position: relative;
    max-width: 200px;
    height: 46px;
    z-index: 2;
    cursor: pointer;
    opacity: 0;
  }

  button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    background-color: #f55e30;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 4px;
    border: none;
    outline: none;
    transition: background-color 0.4s;
    box-shadow: 0 8px 24px rgba(149, 157, 165, 0.5);

    i {
      width: 1.5em;
      height: 1.5em;
      padding: 0.4em;
      background-color: #fff;
      color: #f55e30;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.8em;
      font-size: 0.8em;
    }
  }

  &:hover {
    button {
      background-color: #f15120;
    }
  }
`;

export const Main = styled.p`
  font-weight: bold;
  margin-bottom: 0.4em;
  color: black;
`;

export const Info = styled.p`
  font-size: 0.8rem;
  color: black;
`;

export const FileItem = styled.li`
  list-style: none;
  margin: 1.2em 0;
  background-color: #f55e3038;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 1.2em 1.5em;

  p {
    flex: 1;
    font-size: 0.9rem;
  }
`;
