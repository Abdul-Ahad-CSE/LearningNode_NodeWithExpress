import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  //console.log(req.body);
  //const { name, email, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);

    //console.log(result);
    //the waiter (controller) is giving the chef (service) the ingredients (data).
    //The req.body is the ingredient package.

    res.status(201).json({
      success: true,
      message: "User Created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserFromDB();
    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getUserFromDBById(id as String);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // console.log("Id : ", id);
  // console.log({ name, password, age, is_active });

  try {
    const result = await userService.updateUserInDB(req.body, id as String);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    // console.log(result);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id as String);

    console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};

/*
The response from user.controller.ts goes back to the client.

That client can be:

Postman
Browser
React frontend
Mobile app
Any application calling your API

but NOT to the database. 
Client → Backend → Database
Database → Service → Controller → Client
*/
