import { Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import {Team} from "./teams.interface";
import { AuthGuard } from '../auth/auth.guard';

@Controller('teams')
export class TeamsController {

    /**
     * Allows user to create a team
     * @param team Team object to be created
     *
     * TODO add validation of the object
     * */
    @UseGuards(AuthGuard)
    @Post()
    createTeam(team: Team) {
        throw new Error("Method not implemented.");
    }


    /**
     * Invite a user to a team
     * @param teamId id of the team
     * @param userId id of the user to be invited
     * TODO add a person that is inviting
     * */
    @UseGuards(AuthGuard)
    @Post()
    inviteToTeam(teamId: string, userId: string) {
        throw new Error("Method not implemented.");
    }


    /**
     * TeamOwner can edit the parameters of the team like image or name
     * @param teamId id of the team
     * TODO figure out other parameters
     * */
    @UseGuards(AuthGuard)
    @Put()
    editTeam(teamId: string) {
        throw new Error("Method not implemented.");
    }


    /**
     * Deletes the team
     * @param teamId id of the team
     *
     * TODO add a person that is removing for permission check
     * */
    @UseGuards(AuthGuard)
    @Delete()
    deleteTeam(teamId: string) {
        throw new Error("Method not implemented.");
    }

    /**
     * Removes a user from the team
     * @param teamId id of the team
     * @param userId id of the user to be removed
     *
     * TODO add a person that is removing for permission check
     * */
    @UseGuards(AuthGuard)
    @Delete()
    kickFromTeam(teamId: string, userId: string) {
        throw new Error("Method not implemented.");
    }

    /**
     * Allows user to leave the team
     * @param teamId id of the team
     * */
    @UseGuards(AuthGuard)
    @Delete()
    leaveTeam(teamId: string) {
        throw new Error("Method not implemented.");
    }
}
