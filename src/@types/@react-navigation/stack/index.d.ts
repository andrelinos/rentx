type ScreenDTO = {
  nextScreenRoute: 'SignIn' | 'Home' | 'MyCars';
  title?: string;
  message?: string;
};

declare namespace ReactNavigation {
  export interface RootParamList {
    Splash: undefined;
    SignIn: undefined;
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
    CarDetails: { car: CarDTO | ModelCar | undefined };
    Scheduling: { car: CarDTO | undefined };
    SchedulingDetails: { car: CarDTO | ModelCar | undefined; dates: string[] };
    Confirmation: ScreenDTO;
    MyCars: undefined;
  }
}
