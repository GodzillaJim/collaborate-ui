import { faker } from "@faker-js/faker";

export interface IMessage {
  sender: string;
  message: string;
  date: Date;
  owner: boolean;
  avatar: string;
}

export const getSampleMessages = () => {
  const temp: IMessage[] = [];
  for (let a = 0; a < 14; a++) {
    temp.push({
      message: faker.lorem.sentence(6),
      sender: faker.name.findName(),
      date: new Date(),
      owner: (a + 1) % 2 === 0,
      avatar: faker.image.avatar(),
    });
  }
  return temp;
};
