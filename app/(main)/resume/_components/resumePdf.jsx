import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },

  // HEADER
  name: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 4,
  },

  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  contactItem: {
    marginHorizontal: 10,
    marginVertical: 3,
    fontSize: 10,
  },

  // SECTIONS
  section: {
    marginTop: 18,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
    paddingBottom: 3,
  },

  text: {
    marginTop: 4,
    fontSize: 11,
  },

  itemContainer: {
    marginTop: 10,
  },

  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },

  dates: {
    fontSize: 10,
    color: "#666",
  },
});

export default function ResumePDF({ data, name }) {
  return (
    <Document>
      <Page style={styles.page}>

        {/* NAME */}
        <Text style={styles.name}>{name}</Text>

        {/* CONTACTS */}
        <View style={styles.contactRow}>
          {data.contactInfo.email && (
            <Text style={styles.contactItem}>📧 {data.contactInfo.email}</Text>
          )}
          {data.contactInfo.mobile && (
            <Text style={styles.contactItem}>📱 {data.contactInfo.mobile}</Text>
          )}
          {data.contactInfo.linkedin && (
            <Text style={styles.contactItem}>💼 {data.contactInfo.linkedin}</Text>
          )}
        </View>

        {/* SUMMARY */}
        {data.summary?.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        )}

        {/* SKILLS */}
        {data.skills?.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.text}>{data.skills}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>

            {data.experience.map((exp, idx) => (
              <View key={idx} style={styles.itemContainer}>
                <Text style={styles.itemTitle}>
                  {exp.title} @ {exp.organization}
                </Text>
                <Text style={styles.dates}>
                  {exp.current
                    ? `${exp.startDate} - Present`
                    : `${exp.startDate} - ${exp.endDate}`}
                </Text>
                <Text style={styles.text}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>

            {data.education.map((edu, idx) => (
              <View key={idx} style={styles.itemContainer}>
                <Text style={styles.itemTitle}>
                  {edu.title} @ {edu.organization}
                </Text>
                <Text style={styles.dates}>
                  {edu.current
                    ? `${edu.startDate} - Present`
                    : `${edu.startDate} - ${edu.endDate}`}
                </Text>
                <Text style={styles.text}>{edu.description}</Text>
              </View>
            ))}
          </View>
        )}

       
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>

            {data.projects.map((proj, idx) => (
              <View key={idx} style={styles.itemContainer}>
                <Text style={styles.itemTitle}>
                  {proj.title} @ {proj.organization}
                </Text>
                <Text style={styles.dates}>
                  {proj.current
                    ? `${proj.startDate} - Present`
                    : `${proj.startDate} - ${proj.endDate}`}
                </Text>
                <Text style={styles.text}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
}
