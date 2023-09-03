export interface WorkoutModel {
    username: string,
    sportId: number,
    createdAt: Date,
    duration: string,
    steps: string | null,
    distance: string | null
};