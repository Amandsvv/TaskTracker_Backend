import Task from "../models/task.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createTask = asyncHandler(async (req,res) => {
    const {title,description,status,projectId} = req.body;
    const userId = req.user._id;

    if(!title || !description){
        throw new ApiError(400,"All fields are required");
    }

    try {
        const task = await Task.create({
            title,
            description,
            status,
            projectId,
            userId
        });
    
        if(!task){
            throw new ApiError(400, "Task creation failed");
        }

        return res.status(200).json(new ApiResponse(200,task,"Task created successfully"))

    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const getTasksByProject = asyncHandler(async(req,res) => {
    const {projectId} = req.params;

    if(!projectId){
        throw new ApiError(400, "Project id missing");
    }

    const tasks = await Task.find({projectId});

    return res.status(200).json(new ApiResponse(200,tasks,"Tasks retrived successfully"));
});

const updateTask = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const {title,description, status,completedAt} = req.body;

    const task = await Task.findByIdAndUpdate(id,
        {title,description, status,completedAt},
        {new :true} 
    );
    
    if(!task){
        throw new ApiError(400, "Task updation failed");
    }

    return res.status(200).json(new ApiResponse(200,task,"Task updated successfully"));
});

const deleteTask = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const userId = req.user._id;

    if(!id){
        throw new ApiError(400,"Task id not found");
    }

    if(!userId){
        throw new ApiError(400, "Usser not found or unauthorized to delete");
    }

    const task = await Task.findByIdAndDelete({_id:id, userId});

    if(!task){
        throw new ApiError(404, "Task deletion failed");
    }

    return res.status(200).json(new ApiResponse(200,task,"Task deleted successfully"));
});

export{
    createTask,
    deleteTask,
    updateTask,
    getTasksByProject
}