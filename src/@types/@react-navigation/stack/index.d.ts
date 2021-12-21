declare namespace ReactNavigation {
    export interface RootParamList {
        Splash: undefined;
        SignUpFirstStep: undefined;
        SignUpSecondStep: undefined;
        Home: undefined;
        CarDetails: { car: CarDTO | undefined };
        Scheduling: { car: CarDTO | undefined };
        SchedulingDetails: { car: CarDTO; dates: string[] };
        SchedulingComplete: undefined;
        MyCars: undefined;
    }
}
