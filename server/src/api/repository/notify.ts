import DataConnect from "../../utils/DataConnect";

const NotifyRepository = {
  async getNotifies() {
    try {
      const query = "SELECT * FROM [Notify]";
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting notifies: ${error.message}`);
      }
      throw new Error('Error getting notifies');
    }
  },

  async getNotifyById(id: number) {
    try {
      const query = `SELECT * FROM [Notify] WHERE NotifyID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting notify by id: ${error.message}`);
      }
      throw new Error('Error getting notify by id');
    }
  },

  async createNotify(notify: {
    messageNotify: string;
    statusNotify: string;
    receiveUserId: number;
  }) {
    try {
      const query = `
        INSERT INTO [Notify] (CreatedDate, MessageNotify, StatusNotify, ReceiveUserID)
        VALUES (
          GETDATE(),
          '${notify.messageNotify}',
          '${notify.statusNotify}',
          ${notify.receiveUserId}
        )`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating notify: ${error.message}`);
      }
      throw new Error('Error creating notify');
    }
  },

  async updateNotify(id: number, notify: {
    messageNotify?: string;
    statusNotify?: string;
  }) {
    try {
      let updateFields = [];
      if (notify.messageNotify) updateFields.push(`MessageNotify = '${notify.messageNotify}'`);
      if (notify.statusNotify) updateFields.push(`StatusNotify = '${notify.statusNotify}'`);

      const query = `
        UPDATE [Notify] 
        SET ${updateFields.join(', ')}
        WHERE NotifyID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating notify: ${error.message}`);
      }
      throw new Error('Error updating notify');
    }
  },

  async deleteNotify(id: number) {
    try {
      const query = `DELETE FROM [Notify] WHERE NotifyID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting notify: ${error.message}`);
      }
      throw new Error('Error deleting notify');
    }
  },

  async getNotifiesByUser(userId: number) {
    try {
      const query = `SELECT * FROM [Notify] WHERE ReceiveUserID = ${userId}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting notifies by user: ${error.message}`);
      }
      throw new Error('Error getting notifies by user');
    }
  }
};

export default NotifyRepository;