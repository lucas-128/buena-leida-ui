import { useState } from "react";
import { Title } from "../SearchBar/styled";
import { Container, RightSection, SectionTitle } from "./styled";

import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const defaultPhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/buena-leida.appspot.com/o/profiles%2Fdefault.jpg?alt=media&token=100a1fe2-fd46-4fc5-9d11-e7b78ed946f5";

export const GroupSearch = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const groupId = location.state?.query || "";

  return (
    <Container>
      <div style={{ minWidth: "600px" }}>
        <Title>Grupo id: {groupId}</Title>
      </div>
      <RightSection>
        <SectionTitle>Creador:</SectionTitle>
      </RightSection>

      {/* Adapatar a dialogo de crear topico <Dialog open={showCreateGroupModal} onClose={handleClose}>
        <DialogTitle>Crear Grupo</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value.slice(0, 20))}
              helperText={`${groupName.length}/20`}
              slotProps={{
                htmlInput: { maxLength: 20 },
              }}
              variant="outlined"
            />
          </FormControl>
          <StyledDialogContent>
            {availableCategories.map((category) => (
              <StyledFormControl key={category}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.indexOf(category) !== -1}
                      onChange={() => handleCategoryChange(category)}
                      color="primary"
                    />
                  }
                  label={category}
                />
              </StyledFormControl>
            ))}
          </StyledDialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {availableCategories.length > 0 && (
            <Button color="primary">Guardar</Button>
          )}
        </DialogActions>
      </Dialog> */}
    </Container>
  );
};

export default GroupSearch;
