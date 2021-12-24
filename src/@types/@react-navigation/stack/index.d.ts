declare namespace ReactNavigation {
    export interface RootParamList {
        Splash: undefined;
        SignUpFirstStep: undefined;
        SignUpSecondStep: {
            user:
                | {
                      name: string;
                      email: string;
                      driverLicense: string;
                  }
                | undefined;
        };
        Home: { car: CarDTO | undefined };
        CarDetails: { car: CarDTO | undefined };
        Scheduling: { car: CarDTO | undefined };
        SchedulingDetails: { car: CarDTO; dates: string[] };
        Confirmation: undefined;
        MyCars: undefined;
    }
}
