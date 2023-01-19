import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../../pages/layout/layout";
import { publicRoutes, publicRoutesInLayout } from "../../routes";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route element={<Layout />}>
        {publicRoutesInLayout.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;
